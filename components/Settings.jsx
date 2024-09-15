import React from 'react'

const Settings = ({userId}) => {
  return (
    <div className="container mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center" style={{fontFamily: "LeagueSpartanBold, sans-serif"}}>Account Settings</h1>

      {/* Account Settings Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Account Settings</h2>
        <div className="space-y-4">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Change Password
          </button>
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Two-Factor Authentication
          </button>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="mr-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Dark Mode</label>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
          </div>
          <div className="flex items-center">
            <label className="mr-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Language</label>
            <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Time Zone</label>
            <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              <option>(GMT-5:00) Eastern Time (US & Canada)</option>
              <option>(GMT+0:00) UTC</option>
              <option>(GMT+5:30) India Standard Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Connected Accounts Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Connected Accounts</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Google</span>
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Disconnect
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Facebook</span>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Security</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Login Activity</p>
              <p className="text-xs text-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>View recent login activity and manage devices.</p>
            </div>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              View
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Manage Devices</p>
              <p className="text-xs text-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Sign out from unused devices.</p>
            </div>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Data and Privacy Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Data and Privacy</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Export Data</p>
              <p className="text-xs text-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Download your account data.</p>
            </div>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Export
            </button>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600 mr-2" />
            <label style={{fontFamily: "LeagueSpartan, sans-serif"}}>Allow data sharing with partners</label>
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600 text-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Danger Zone</h2>
        <div className="space-y-4">
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Delete Account
          </button>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Reset Settings
          </button>
        </div>
      </div>
    </div>
  )
}
export default Settings