'use client';
import { use, useContext, useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, Router } from 'lucide-react';
import { AuthContext } from '@/Auth/AuthProvider';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';



export default function RegisterPage() {
  const router = useRouter();
  const {createUser, gLogin} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Hcere you would integrate with Firebase Auth
      // Example:
      // await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // await updateProfile(auth.currentUser, { displayName: formData.name });
      createUser(formData.email, formData.password)
      .then((result)=>{

        console.log(result)
      })
      
      console.log('Registration data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
     toast.success('Sucessfully Register', {
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
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGooglelogin = () => {

    setIsLoading(true);
    gLogin()
     .then((result) =>{
      console.log("google login", result.user)

      toast.success(' Register sucessfully', {
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

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 2) return 'progress-error';
    if (strength <= 3) return 'progress-warning';
    return 'progress-success';
  };

  const getStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen  bg-[rgba(62,163,252,0.15)] from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="avatar placeholder mb-4">
            <div className="bg-primary text-primary-content rounded-full w-16">
              <User size={32} /> 
            </div>
          </div>
          <h1 className="text-3xl font-bold text-base-content">Create Account</h1>
          <p className="text-base-content/70 mt-2">Join us today and get started</p>
        </div>

        {/* Registration Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* General Error */}
              {errors.general && (
                <div className="alert alert-error">
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`input input-bordered w-full pl-10 ${errors.name ? 'input-error' : ''}`}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={18} />
                </div>
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name}</span>
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={18} />
                </div>
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`input input-bordered w-full pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-base-content/70">Password Strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength() <= 2 ? 'text-error' : 
                        passwordStrength() <= 3 ? 'text-warning' : 'text-success'
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <progress 
                      className={`progress ${getStrengthColor()} w-full h-2`} 
                      value={passwordStrength()} 
                      max="5"
                    ></progress>
                  </div>
                )}
                
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`input input-bordered w-full pl-10 pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                  />
                  <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                  </label>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-success flex items-center gap-1">
                      <CheckCircle size={14} />
                      Passwords match
                    </span>
                  </label>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="form-control">
                <label className="cursor-pointer label justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary" required />
                  <span className="label-text">
                    I agree to the <a href="#" className="link link-primary">Terms of Service</a> and{' '}
                    <a href="#" className="link link-primary">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className={`btn btn-primary w-full 
                     
                   
                    `}
                  disabled={isLoading}
                >
                  {isLoading ? <p> <span className="loading loading-spinner loading-xs"></span>  Creating Account...</p> : 'Create Account'}
                  
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider">or</div>

            {/* Social Login Options */}
            <div className="space-y-3">
              <button
              onClick={handleGooglelogin}
               className="btn btn-outline w-full gap-2">
                
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <button className="btn btn-outline w-full gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Continue with Twitter
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-base-content/70">
                Already have an account?{' '}
                <a href="/login" className="link link-primary font-medium">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
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
  );
}