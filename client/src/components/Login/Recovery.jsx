import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { generateOTP, verifyOTP, getUser } from '../../helper/helper';
import { useNavigate } from 'react-router-dom'
import logo1 from "../../assets/robot.png";
import emailjs from 'emailjs-com';
import { useStateContext } from '../../context/ContextIndex'



export default function Recovery() {

  const [OTP, setOTP] = useState();
  const [username, setUsername] = useState();
  const { setUsernameRecover } = useStateContext();
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(false);


  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP })
      if (status === 201) {
        toast.success('Verify Successfully!')
        setUsernameRecover(username);
        localStorage.setItem('changePasswordOK', 1);
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }


  function sendEmail(code) {

    let  data  = getUser({ username });
  
    
    data.then((data) => {
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
          var templateParams = {
            name: username,
            message: text,
            user_email: data.data[0].email
          };
          emailjs.send("service_qi6o4k9", 'template_h7sxe3g', templateParams, 'R6IOKn6Ev8YyT4GLz')
    })
    .catch(error => {
      console.log("Send email ERROR!");
    });
   
    

  }

  // handler of resend OTP
  function resendOTP() {

    if (!username) {
      return toast.error('Insert user name')
    } else {
      let sentPromise = generateOTP(username);

      toast.promise(sentPromise,
        {
          loading: 'Sending...',
          success: <b>OTP has been send to your email!</b>,
          error: <b>Username is not correct!</b>,
        }
      );

      sentPromise.then((OTP) => {
        setIsDisabled(!isDisabled);
        sendEmail(OTP);
      })
        .catch(error => {
          console.log("Username is not correct!");
        });
    }


  }

  return (


    <div className="container">

      {/* AVISOS EN EL CENTRO */}
      <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 1000 }}></Toaster>


      {/* PANEL DE LA DERECHA */}
      <div className="forms-container">

        <div className="signin-signup">
          <form className='pt-10' onSubmit={onSubmit}>
            <h2 className="text-5xl font-bold pb-5">Recover Password</h2>



            <div className="input-field">
              <i className="bx bxs-user"></i>
              <input disabled={isDisabled} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username' required />
            </div>

            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter 6 digit OTP sent to your email address.
            </span>
            <div className="text-center py-4 pt-5">
              <span className='text-gray-500'><button onClick={resendOTP} className='text-red-500'>Send OTP</button></span>
            </div>
            <div className="input-field">
              <i className='bx bxs-lock-open'></i>
              <input onChange={(e) => setOTP(e.target.value)} type="text" placeholder='OTP' required />
            </div>



            <button className="btn" type='submit'>Recover</button>

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
