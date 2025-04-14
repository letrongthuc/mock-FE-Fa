import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { FaTimes, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../../hooks/use-auth';

function LogIn() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const { login, errorMessage, loading } = useAuth();

  const handleLogin = async () => {
    const success = await login(emailValue, passwordValue);
    if (success) {
      window.location.href = '/';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-[#2C2C47]">
      <div className="w-full max-w-2xl p-2 ">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Login</h2>
        <hr className="border-[#2C2C47] mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium">Email address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="xxx@example.com"
                className="w-full mt-1 p-2 border border-[#2C2C47] rounded-md"
                spellCheck="false"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                ref={inputEmailRef}
              />

              {emailValue.length > 0 && (
                <button
                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title="Clear email"
                  onClick={() => {
                    setEmailValue('');
                    inputEmailRef.current.focus();
                  }}
                >
                  <FaTimes className="text-lg" />
                </button>
              )}
            </div>

            <label className="block mt-4 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Please enter a password"
                className="w-full mt-1 p-2 border border-[#2C2C47] rounded-md"
                spellCheck="false"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                ref={inputPasswordRef}
              />
              {passwordValue.length > 0 && (
                <>
                  <button
                    className="absolute right-9 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEye className="text-lg" title="Hide Password" />
                    ) : (
                      <FaEyeSlash className="text-lg" title="Show Password" />
                    )}
                  </button>
                  <button
                    className="absolute right-3 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                    title="Clear password"
                    onClick={() => {
                      setPasswordValue('');
                      inputPasswordRef.current.focus();
                    }}
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </>
              )}
            </div>

            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

            <button
              className="w-full mt-6 p-3 bg-[#2C2C47] text-white rounded-md font-semibold 
            transition duration-300 ease-in-out hover:scale-105 active:scale-95 
            flex items-center justify-center gap-2"
              onClick={handleLogin}
              disabled={loading}
            >
              LOG IN
              {loading && <FaSpinner className="animate-spin ml-2 mt-1" />}
            </button>

            <div className="text-orange-500 hover:text-orange-600 active:text-orange-700 text-sm mt-3 text-center">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-medium mb-2">Create an account</p>
            <Link
              to="/signup"
              className="transition duration-300 ease-in-out hover:scale-105 active:scale-95 px-6 py-2 border-2 border-[#2C2C47] text-[#2C2C47] rounded-full font-semibold hover:bg-[#2C2C47] hover:text-white transition"
            >
              CREATE AN ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
