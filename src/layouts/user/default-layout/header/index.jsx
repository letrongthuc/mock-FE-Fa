import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaHeart, FaShoppingCart, FaComment } from 'react-icons/fa';
import Chatbot from '../../../../components/chat-bot';
import Search from '../../../../components/search';
import Notification from '../../../../components/notification';
import Avatar from '../../../../components/avatar';
import useFetchUserData from '../../../../hooks/use-fetch-user-data';
import useNotifications from '../../../../hooks/use-notification';

function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userId, setUserId] = useState(null);

  useLayoutEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload && payload.user_id) {
          setIsLoggedIn(true);
          setUserId(payload.user_id);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    setIsAuthChecked(true);
  }, []);

  const user = useFetchUserData(userId);
  const { notifications, loading, error, unreadCount: initialUnreadCount } = useNotifications(userId);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount || 0);

  useEffect(() => {
    if (initialUnreadCount !== undefined) {
      setUnreadCount(initialUnreadCount);
    }
  }, [initialUnreadCount]);

  const handleNotificationDelete = (isRead) => {
    if (!isRead) {
      setUnreadCount((prev) => prev - 1);
    }
  };

  const handleNotificationRead = (isReadChange) => {
    setUnreadCount((prev) => {
      if (prev > 0 && isReadChange === -1) {
        return prev - 1;
      } else if (isReadChange === 1) {
        return prev + 1;
      } else if (isReadChange === 0) {
        return 0;
      } else {
        return prev;
      }
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserId(null);
    navigate('/');
  };

  return (
    <header className="bg-[#2C2C47] font-serif text-white px-16 md:pr-24 py-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold flex lg:px-8">
        <Link to="/" title="Discover the latest trends at FashionX!">
          <span className="text-white text-lg md:text-3xl hover:text-orange-400 active:text-orange-500 transition duration-200">
            Fashion
          </span>
          <span className="text-green-400 text-lg md:text-3xl">X</span>
        </Link>
      </h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Search />
        <div className="relative">
          <FaBell
            className="text-sm md:text-xl cursor-pointer hover:text-orange-400 active:text-orange-500 transition duration-200"
            title="View Notifications"
            onMouseDown={() => setShowNotification(true)}
          />
          {unreadCount > 0 && !showNotification && isLoggedIn && (
            <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <Notification
            isOpen={showNotification}
            onClose={() => setShowNotification(false)}
            isLoggedIn={isLoggedIn}
            notifications={notifications}
            loading={loading}
            error={error}
            onNotificationDelete={handleNotificationDelete}
            onNotificationRead={handleNotificationRead}
          />
        </div>

        <Link to="/favorites" title="View Favorites">
          <FaHeart className="text-sm md:text-xl cursor-pointer hover:text-orange-400 active:text-orange-500 transition duration-200" />
        </Link>
        <Link to="/cart" title="Go to Shopping Cart">
          <FaShoppingCart className="text-sm md:text-xl cursor-pointer hover:text-orange-400 active:text-orange-500 transition duration-200" />
        </Link>
        <FaComment
          className="text-sm md:text-xl cursor-pointer hover:text-orange-400 active:text-orange-500 transition duration-200"
          title="Chat with us"
          onClick={() => setIsChatOpen(true)}
        />
        <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        {isAuthChecked &&
          (!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-sm md:text-xl ml-4 hover:text-orange-400 active:text-orange-500"
                title="Log in to your account"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-sm md:text-xl ml-2 hover:text-orange-400 active:text-orange-500"
                title="Sign up for a new account"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="pl-2">
              <Avatar handleLogout={handleLogout} user={user} />
            </div>
          ))}
      </div>
    </header>
  );
}

export default Header;
