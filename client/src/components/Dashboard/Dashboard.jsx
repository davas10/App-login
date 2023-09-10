import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

import styles from "../../styles/Username.module.css";
export default function PageNotFound() {

  const navigate = useNavigate()


  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div>

      {/* AVISOS EN EL CENTRO */}
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 500}}></Toaster>

      <div className={styles.pageImg}>INICIAMOS</div>


      <div className="text-center py-4">
        <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
      </div>

    </div>

  )
}
