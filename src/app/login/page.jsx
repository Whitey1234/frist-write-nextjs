'use client'
import Lottie from 'lottie-react'
import React, { useContext, useState } from 'react'
import loginAnimation from  '../../../public/animation/G82hzrRhIr.json'
import Link from 'next/link'
import { AuthContext } from '@/Auth/AuthProvider'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'




export default function Login() {

  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login,gLogin} = useContext(AuthContext)
  const handleLogin = (e)=>{
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    login(email,password)
    .then((result)=>{
      const user = result.user ;
      
      toast.success('You are login Sucessfully !', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});

router.push('/')
    })
    .catch ((err)=>{
      const errorMassage = console.log(err.massage)
    })
  }
     const handleGoogleLogin =()=>{
      gLogin()
      .then((result)=>{
        const user = result.user;
        toast.success(' You are login Sucessfully!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
router.push('/')
        
      })
      .catch((err)=>{
          const errorMassage = console.log(err.massage)
      })
     
  }
  return (
    
   <div className="hero bg-[rgba(62,163,252,0.15)] min-h-screen  ">
   
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="text-center lg:text-left justify-center items-center">
      
      
      <Lottie
        animationData={loginAnimation}
        loop={true}
        className="w-64 h-64"
      />
    </div>

    <form onSubmit={handleLogin} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
       <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">Login now!</h1>
        <div className="form-control">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button type='submit' className="btn btn-outline bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mt-4 w-full mb-1   hover:rounded-2xl">Login</button>
           <button
              onClick={handleGoogleLogin}
               className="btn btn-outline w-full gap-2 pt-2 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:rounded-2xl  ">
                
                <svg className="w-5 h-5 " viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
        </div>
        <p className='text-xs font-bold text-center pt-2'> If you haven't any Accout , <Link className=' text-blue-600 ' href={'/register'}> Register</Link> !</p>

      </div>
    </form>
  </div>
   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
</div>
  )
}
