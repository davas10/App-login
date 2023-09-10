import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo1 from "../../assets/robot.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../../helper/validate";
import { passwordValidate } from "../../helper/validate";
import { verifyPassword } from "../../helper/helper";
import { registerUser } from '../../helper/helper'
import { registerValidationNotRepeatBefore } from "../../helper/validate";




export default function Username() {


  useEffect(() => {
    localStorage.removeItem('changePasswordOK');


  });

  const navigate = useNavigate();
  

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('bx bx-show');

  const formik = useFormik({
    initialValues: {
      username: 'example123',
      password: 'admin@123'
    },
    validate: usernameValidate, passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {

      let loginPromise = verifyPassword({ username: values.username, password: values.password })

      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/dashboard')
      })
        .catch(error => {
          console.log("Password does not Match");
        })
    }
  });


  const formik2 = useFormik({
    initialValues: {
      email: 'david.i1990@hotmail.com',
      username: 'example123',
      password: 'admin@123'
    },
    validate: registerValidationNotRepeatBefore,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // values = await Object.assign(values, { profile : file || ''})
      values = await Object.assign(values)
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register.</b>
      });

      registerPromise.then(function () { navigate('/') });
    }
  })



  const ChangeEventSignUp = () => {
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
  };

  const ChangeEventSignIn = () => {
    const container = document.querySelector(".container");
    container.classList.remove("sign-up-mode");
  };



  const handleToggle = () => {
    if (type === 'password') {
      setIcon('bx bxs-low-vision');
      setType('text');
    }
    else {
      setIcon('bx bx-show');
      setType('password');
    }
  }



  return (

    <div className="container">

      {/* AVISOS EN EL CENTRO */}
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 1000 }}></Toaster>

      <div className="forms-container">
        <div className="signin-signup">

          {/* FORMULARIO INICIO SESIÓN */}
          <form onSubmit={formik.handleSubmit} className="sign-in-form">
            <h2 className="text-5xl font-bold">Sign in</h2>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
            <div className="input-field">
              <i className="bx bxs-user"></i>
              <input {...formik.getFieldProps('username')} type="text" placeholder='Username' required />
            </div>
            <div className="input-field">
              <i className="bx bxs-lock-alt"></i>
              <div >
                <input {...formik.getFieldProps('password')} type={type} placeholder='Password' required />

                <span onClick={handleToggle} ><i className={icon} ></i></span>

              </div>
            </div>
            <div className="pt-5">
              <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
            </div>
            <input type="submit" value="Login" className="btn solid" />

          </form>

          {/* FORMULARIO DE REGISTRO */}
          <form onSubmit={formik2.handleSubmit} className="sign-up-form pt-10" >
            <h2 className="text-5xl font-bold">Register</h2>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you!
            </span>

            <div className="input-field">
              <i className='bx bx-envelope'></i>
              <input {...formik2.getFieldProps('email')} type="email" placeholder="Email" required />
            </div>

            <div className="input-field">
              <i className="bx bxs-user"></i>
              <input {...formik2.getFieldProps('username')} type="text" placeholder="Username" required />
            </div>

            <div className="input-field pt-5">
              <i className="bx bxs-lock-alt"></i>
              <div >
                <input {...formik2.getFieldProps('password')} type={type} placeholder="Password" required />
                <span onClick={handleToggle} ><i className={icon} ></i></span>
              </div>
            </div>
            <input type="submit" className="btn" value="Register" />

          </form>


        </div>
      </div>







      {/* PANELES*/}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={ChangeEventSignUp}>
              Sign up
            </button>
          </div>
          <img src={logo1} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={ChangeEventSignIn}>
              Sign in
            </button>
          </div>
          <img src={logo1} className="image" alt="" />
        </div>
      </div>
    </div>







    //{/* CODIGO ANTERIOR */}

    // <div className={styles.pageImg}>
    //   <Toaster position="top-center" reverseOrder={false}></Toaster>

    //   {/* <div className="flex"> */}
    //     <div className={screenSize >= 900 ? styles.glass : styles.glass2} > 


    //       {screenSize >= 1350 || screenSize <= 800  ? ( 
    //           <div className="title flex flex-col items-center">
    //          <img src={logo1} className={styles.profile_img} alt="logo" />   
    //          <span className="py-4 text-xl w-2/3 text-center text-gray-500">
    //          Explore More by connecting with us.    
    //          </span>  
    //          </div>  
    //       ) : (
    //         <div> </div>
    //       )}





    //       <div className="profile flex justify-center py-4"></div>

    //       <form className="py-1" onSubmit={formik.handleSubmit}>

    //         <div className="form-field" style={{display:"none"}}>
    //           <input type="email" placeholder="email" />
    //         </div>

    //         <div className="form-field">
    //         <input {...formik.getFieldProps('username')}  type="text" placeholder='Username' required/>
    //           {/* <input type="Username" placeholder="Username" required /> */}
    //         </div>

    //         <div className="form-field">
    //         <input {...formik.getFieldProps('password')} type="text" placeholder='Password' required/>
    //           {/* <input type="password" placeholder="Password" required /> */}
    //         </div>
    //         <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
    //         <button className={styles.btn} type='submit'>Let's Go</button>

    //         {/* <div className="textbox flex flex-col items-center gap-6">
    //               <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
    //               <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' />
    //               <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
    //               <button className={styles.btn} type='submit'>Let's Go</button>
    //           </div> */}

    //         <div className="pt-10">
    //           <span  className="text-gray-500">
    //             Not a Member{" "}
    //             <Link className="text-red-500" to="/register">
    //               Register Now
    //             </Link>
    //           </span>
    //         </div>
    //       </form>
    //     </div>
    //   {/* </div> */}
    // </div>
  );
}
