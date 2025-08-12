'use client'
import { AuthContext } from '@/Auth/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { use, useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify';



export default function Nav() {
  const router = useRouter()
     const { user,logout, loading} = use(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const handlelogout = ()=>{
      logout()
      .then(()=>{
       toast.success( ' Sucessfully Logout ', {
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
        
    }
   // console.log(user)
  return (
     <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md">
      <div className="flex-1">
     <Link href={"/"}
  className="
    text-3xl font-extrabold
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
    bg-clip-text text-transparent
    cursor-pointer select-none
    drop-shadow-lg
  "
>
  First Write
</Link>




        {
          user ? (
             <div className="dropdown dropdown-end tooltip tooltip-right pl-8"
          data-tip={user?.displayName}
          >
                  <div tabIndex={0} className="avatar">
                    <div className="w-8 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL || 
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" />
                    </div>
                  </div>
                 <ul
  tabIndex={0}
  className="dropdown-content dropdown-bottom left-0 menu bg-base-100 text-black rounded-box w-52 p-2 shadow"
>
  <li><span className="text-center">{user?.displayName}</span></li>
  <li><span className="text-center">{user?.email}</span></li>
</ul>

                </div>
          ) :(
            ''
          )
        }
        
      </div>
      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-4">
       <Link href="/" className="relative inline-block rounded-b-xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Home
  </div>
</Link>

      <Link href={'/allbooks'} className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Books
  </div>
</Link>
 {
  
  user ? (
    <>
    <Link href={'/dashboard'} className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group"> <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Dashboard
  </div></Link>
   <Link href="/contact" className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Contact
  </div>
</Link>
    </>
    
  
  ) :(
    <>
    
   <Link href="/aboutus" className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    About US
  </div>
</Link>

        <Link href="/contact" className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Contact
  </div>
</Link>

       
  </>  
  )
 }
     

       {
              user ? (
                <button
                onClick={handlelogout}
                className='btn btn-primary bg-gradient-to-r  from-pink-500 via-purple-500 rounded-2xl ml-6'>
                  Logout
                </button>
              ) : (
                   <Link href={'/login'} className='btn btn-primary  bg-gradient-to-r from-pink-500 via-purple-500 rounded-2xl ml-6 '>Login</Link>
              )
          }
       
      
</div> 
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button
          className="btn btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}  
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 shadow-md flex flex-col items-start p-4 lg:hidden">
          <Link href="/" className="relative inline-block rounded-b-xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Home
  </div>
</Link>

      <a href="#" className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Feature
  </div>
</a>

     {
  user ? (
    <Link href={'/dashboard'} className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group"> <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Dashboard
  </div></Link>
  ) :(
    <>
    
   <a href="#" className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    prching
  </div>
</a>

        <a href="#" className="relative inline-block rounded-b-xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group">
  <div className="btn btn-ghost rounded-b-xl bg-white text-black group-hover:bg-gray-100 transition-colors duration-300">
    Contact
  </div>
</a>

       
  </>  
  )
 }
     
          {
              user ? (
                <button
                onClick={handlelogout}
                className='btn btn-primary bg-gradient-to-r  from-pink-500 via-purple-500 rounded-2xl ml-6'>
                  Logout
                </button>
              ) : (
                   <Link href={'/login'} className='btn btn-primary  bg-gradient-to-r from-pink-500 via-purple-500 rounded-2xl ml-6 '>Login</Link>
              )
          }


      
        </div>
      )}
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
