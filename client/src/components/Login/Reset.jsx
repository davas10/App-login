import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate'
import { resetPassword } from '../../helper/helper'
import { useNavigate } from 'react-router-dom';
import logo1 from "../../assets/robot.png";
import { useStateContext } from '../../context/ContextIndex'
import styles from '../../styles/Username.module.css';

export default function Reset() {


  const { usernameRecover } = useStateContext();
  const navigate = useNavigate();



  useEffect(() => {
    const changePassword = localStorage.getItem('changePasswordOK');

    if(changePassword!=="1"){
         navigate('/');
      }
  });



  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
      confirm_pwd: 'admin@123'
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {

      let resetPromise = resetPassword({ usernameRecover, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>
      });

      resetPromise.then(function () { navigate('/') })

    }
  })



  return (

    <div className="container">

      {/* AVISOS EN EL CENTRO */}
      <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 2000 }}></Toaster>


      {/* PANEL DE LA DERECHA */}
      <div className="forms-container">

        <div className="signin-signup">
          <form className='pt-10' onSubmit={formik.handleSubmit}>
            <h2 className="text-5xl font-bold pb-5">Reset Password</h2>


            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter new password.
            </span>
            <div className="input-field">
              <i className='bx bxs-lock-open'></i>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' />

            </div>
            <div className="input-field">
              <i className='bx bxs-lock-open'></i>
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Repeat Password' />
            </div>
            
            <button className="btn" type='submit'>Reset</button>

          </form>

        </div>
      </div>




      {/* PANEL DE LA IZQUIERDA */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Escribir algo?</h3>
            <p>
              Escribir algo y cambiar imagen
            </p>

          </div>
          <img src={logo1} className="image" alt="" />
        </div>

      </div>


    </div>

 
  )
}
