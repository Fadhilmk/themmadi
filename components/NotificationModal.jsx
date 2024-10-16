"use client";
import { IoClose } from "react-icons/io5";

const NotificationModal = ({
  isMobile,
  notifications,
  handleCloseNotificationModel,
  markNotificationAsRead,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 60 }}
    >
      <div
        className="bg-white p-6 m-4 rounded-xl shadow-lg max-w-lg mx-4 sm:mx-0 w-[90%] md:w-full"
        style={
          isMobile
            ? {
              position: "absolute",
            }
            : {
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }
        }
      >
        <div
          className="flex justify-end absolute p-2"
          style={isMobile ? { top: 0, right: 0 } : { top: 0, right: 0 }}
        >
          <IoClose
            onClick={handleCloseNotificationModel}
            className="text-black text-3xl cursor-pointer"
          />
        </div>
        <h2
          className="text-2xl font-bold mb-4 text-center mb-6"
          style={{ fontFamily: "LeagueSpartanbold, sans-serif" }}
        >
          Notifications
        </h2>

        {/* Display notifications */}
        {notifications.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mb-4 p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-blue-500 p-4 rounded-lg shadow-md ${
                  notification.isRead ? "opacity-50" : ""
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {notification.title || "Notification"}
                </h3>
                <p className="text-sm text-white">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-300">
                  {new Date(notification.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
