// Settings.jsx
"use client";
import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import PasswordModal from './PasswordModal'; // Adjust the import path as needed

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Added for re-authentication

  const auth = getAuth();
  const user = auth.currentUser;

  const handleReauthenticate = async (password) => {
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      setError('Re-authentication failed. Please check your current password.');
      return false;
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('No user is currently signed in.');
      return;
    }

    const currentPassword = event.target.currentPassword.value; // Get current password from form
    const newPassword = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Re-authenticate before updating the password
      const reauthenticated = await handleReauthenticate(currentPassword);
      if (reauthenticated) {
        await updatePassword(user, newPassword);
        setSuccessMessage('Password updated successfully.');
        setIsModalOpen(false);
      }
    } catch (error) {
      setError(error.message || 'An error occurred while updating the password.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center" style={{fontFamily: "LeagueSpartanBold, sans-serif"}}>Account Settings</h1>

      {/* Account Settings Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Account Settings</h2>
        <div className="space-y-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            style={{fontFamily: "LeagueSpartan, sans-serif"}}
          >
            Change Password
          </button>
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
            Change Number
          </button>
        </div>
      </div>

      {/* Modal for Change Password */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleChangePassword}
      />
      
      {/* Display error message if any */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {/* Display success message */}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
    </div>
  );
};

export default Settings;
