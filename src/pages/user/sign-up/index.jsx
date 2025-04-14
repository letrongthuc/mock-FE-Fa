import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import useRegister from '@/hooks/use-auth/useRegister';  // Đảm bảo đường dẫn đúng

function SignUp() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  
  const { register, errorMessage, loading } = useRegister();  // Sử dụng hook register

  const handleSignUp = async () => {
    if (passwordValue !== confirmPasswordValue) {
      alert('Passwords do not match');
      return;
    }

    const success = await register(nameValue, emailValue, passwordValue, confirmPasswordValue);
    
    if (success) {
      alert('Sign up successful');
    } else {
      alert(errorMessage || 'Sign up failed');
    }
  }

  return (
    <div className="flex min-h-screen items-center text-[#2C2C47] justify-center">
      <div className="flex w-full max-w-4xl bg-white rounded-lg overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img
            src="images/fashion.jpg"
            alt="Fashion"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                spellCheck="false"
                className="w-full p-3 border border-[#2C2C47] rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              />
              {nameValue.length > 0 && (
                <button
                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title="Clear name"
                  onClick={() => setNameValue('')}
                >
                  <FaTimes className="text-lg" />
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="E-mail"
                spellCheck="false"
                className="w-full p-3 border border-[#2C2C47] rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              />
              {emailValue.length > 0 && (
                <button
                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title="Clear email"
                  onClick={() => setEmailValue('')}
                >
                  <FaTimes className="text-lg" />
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                spellCheck="false"
                className="w-full p-3 border border-[#2C2C47] rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              />
              {passwordValue.length > 0 && (
                <button
                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title="Clear password"
                  onClick={() => setPasswordValue('')}
                >
                  <FaTimes className="text-lg" />
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Confirm password"
                spellCheck="false"
                className="w-full p-3 border border-[#2C2C47] rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500"
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              />
              {confirmPasswordValue.length > 0 && (
                <button
                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title="Clear confirm password"
                  onClick={() => setConfirmPasswordValue('')}
                >
                  <FaTimes className="text-lg" />
                </button>
              )}
            </div>
          </div>

          <button
            className="w-full mt-6 p-3 bg-[#2C2C47] text-white font-semibold rounded-md
                      transition duration-300 ease-in-out hover:scale-105 active:scale-95"
            onClick={handleSignUp}
            disabled={loading}  // Disable button while loading
          >
            {loading ? 'Signing up...' : 'SIGN UP'}
          </button>

          <p className="mt-4 text-center text-orange-600 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#2C2C47] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
