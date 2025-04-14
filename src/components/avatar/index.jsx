import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

function Avatar({ handleLogout, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        title="Account options"
        className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
      >
        <img src="/images/default-avatar.jpg" alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
      </button>

      {isOpen && (
        <div className="absolute text-[#2C2C47] left-1/2 top-12 z-10 -translate-x-1/2 bg-white shadow-lg rounded-lg py-2 w-40 animate-fade-in">
          <div className="py-2 w-48 bg-white shadow-lg rounded-lg">
            <Link to="/profile" state={{ user: user }}>
              <button
                className="flex items-center w-full px-4 py-2 text-left hover:text-orange-400 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="mr-4" />
                Profile
              </button>
            </Link>
            <button
              className="flex items-center w-full px-4 py-2 text-left hover:text-red-500 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
