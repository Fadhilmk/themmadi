import React from 'react'

const UserAccount = ({userId}) => {
  return (
    <div className="container mx-auto">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <img
            className="w-24 h-24 rounded-full border-2 border-gray-200 mr-4"
            src="https://via.placeholder.com/150" // Replace with user's avatar URL
            alt="User Avatar"
          />
          <div>
            <h2 className="text-2xl font-bold" style={{fontFamily: "LeagueSpartanbold, sans-serif"}}>John Doe</h2>
            <p className="text-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>johndoe@example.com</p>
            <p className="text-gray-500" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Member since January 2023</p>
          </div>
        </div>
      </div>

      {/* Account Information Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartanbold, sans-serif"}}>Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold" >Full Name:</span> John Doe</p>
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Email:</span> johndoe@example.com</p>
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Phone:</span> +123 456 7890</p>
          </div>
          <div>
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Address:</span> 123 Main Street, City, Country</p>
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Date of Birth:</span> January 1, 1990</p>
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Gender:</span> Male</p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Settings</h3>
        <div className="space-y-4">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Change Password
          </button>
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Manage Notifications
          </button>
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Delete Account
          </button>
        </div>
      </div>

      {/* Activity Logs Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Recent Activity</h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-2">
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Logged in from IP: 192.168.1.1</p>
            <p className="text-gray-500 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>2 hours ago</p>
          </li>
          <li className="py-2">
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Changed password</p>
            <p className="text-gray-500 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>1 day ago</p>
          </li>
          <li className="py-2">
            <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Updated profile information</p>
            <p className="text-gray-500 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>3 days ago</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default UserAccount