import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FaBell, FaSpinner, FaUndo, FaTimes } from 'react-icons/fa';
import useUpdateNotificationStatus from '../../hooks/use-update-notification-status';
import useDeleteNotification from '../../hooks/use-delete-notification';
import useDeleteAllNotifications from '../../hooks/use-delete-all-notifications';

const formatDateTime = (isoString) => {
  const dateObj = new Date(isoString);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

function Notification({
  isOpen,
  onClose,
  isLoggedIn,
  notifications,
  loading,
  error,
  onNotificationDelete,
  onNotificationRead,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [notificationList, setNotificationList] = useState(notifications || []);

  const { toggleNotificationStatus } = useUpdateNotificationStatus();
  const { deleteNotification } = useDeleteNotification();
  const { deleteAllNotifications } = useDeleteAllNotifications();

  useEffect(() => {
    setNotificationList(notifications);
  }, [notifications]);

  const handleNotificationClick = (notificationId, currentStatus, flag) => {
    toggleNotificationStatus(notificationId, currentStatus);
    const updatedNotifications = notificationList.map((n) =>
      n.id === notificationId ? { ...n, is_read: !currentStatus } : n
    );
    setNotificationList(updatedNotifications);
    onNotificationRead(flag);
  };

  const handleDeleteNotification = async (notificationId, isRead) => {
    const success = await deleteNotification(notificationId);
    if (success) {
      setNotificationList((prev) => prev.filter((n) => n.id !== notificationId));
      onNotificationDelete(isRead);
    }
  };

  const handleClearAll = async () => {
    const success = await deleteAllNotifications();
    if (success) {
      setNotificationList([]);
      onNotificationRead(0);
    }
  };

  return (
    <Tippy
      appendTo={document.body}
      interactive
      visible={isOpen}
      offset={[116, 10]}
      render={(attrs) => (
        <div
          tabIndex="-1"
          {...attrs}
          className="font-serif bg-white text-[#2C2C47] shadow-xl rounded-lg w-64"
          style={{ maxHeight: '250px', overflowY: 'auto', scrollbarWidth: 'none' }}
        >
          <div className="sticky top-0 bg-white z-6 px-3 pt-3 -mb-3">
            <h3 className="text-lg font-semibold flex justify-between items-center">
              Notification
              <FaBell className="inline-flex mb-1" />
            </h3>
          </div>
          <div className="p-3">
            {!isLoggedIn ? (
              <Link
                to="/login"
                title="Log in to your account"
                onClick={() => {
                  onClose();
                  setSelectedIndex(null);
                }}
              >
                <p className="text-left text-base hover:text-orange-500 mt-1">Please log in to view notifications.</p>
              </Link>
            ) : loading ? (
              <p className="text-gray-500 mt-2 flex items-center">
                Loading notifications
                <FaSpinner className="animate-spin ml-1" />
              </p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : notificationList.length > 0 ? (
              <div className="text-base mt-1">
                {notificationList.map((notification, index) => (
                  <div key={notification.id} className="border-b">
                    <div className="flex items-center justify-between w-full">
                      <button
                        className={`text-left py-1 hover:text-orange-400 active:text-orange-600 ${
                          notification.is_read ? 'text-gray-400' : 'text-[#2C2C47]'
                        }`}
                        onClick={() => {
                          setSelectedIndex(index === selectedIndex ? null : index);
                          if (!notification.is_read) {
                            handleNotificationClick(notification.id, notification.is_read, -1);
                          }
                        }}
                      >
                        {notification.title}
                      </button>

                      <button
                        className="text-xs text-gray-400 hover:text-red-500 mr-0.5"
                        onClick={() => {
                          handleDeleteNotification(notification.id, notification.is_read);
                          setSelectedIndex(null);
                        }}
                        title="Delete"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {selectedIndex === index && (
                      <div className="mt-1 p-2 bg-gray-100 rounded">
                        <p>{notification.message}</p>
                        <div className="font-sans text-right text-xs text-gray-600">
                          {formatDateTime(notification.created_at)}
                        </div>

                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            className="hover:text-orange-400 text-sm flex items-center space-x-1"
                            onClick={() => {
                              handleNotificationClick(notification.id, notification.is_read, 1);
                              setSelectedIndex(null);
                            }}
                          >
                            <FaUndo className="text-xs" />
                            <span>Mark as Unread</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No notifications available.</p>
            )}
          </div>
          <div className="sticky bottom-0 bg-white z-6 px-3 pb-3 pt-2">
            {notificationList.length > 0 && (
              <button className="mr-2 hover:text-orange-400 active:text-orange-500" onClick={handleClearAll}>
                Clear All
              </button>
            )}
            <button
              onClick={() => {
                onClose();
                setSelectedIndex(null);
              }}
              className={`font-semibold hover:text-orange-400 active:text-orange-500 ${
                notificationList.length > 0 ? 'md:pl-28' : 'md:pl-44'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
      onClickOutside={() => {
        onClose();
        setSelectedIndex(null);
      }}
    >
      <span />
    </Tippy>
  );
}

export default Notification;
