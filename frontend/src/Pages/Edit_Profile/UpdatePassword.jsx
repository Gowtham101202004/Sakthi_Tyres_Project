import React, { useState } from 'react';
import axios from 'axios';
import Toaster from '../../Form/Toaster';
import SuccessToast from '../../Form/SuccessToast';
import './EditProfile.css';


function UpdatePassword({ id }) {
  const [updatedPassword, setUpdatedPassword] = useState({
    currentPassword: '',
    newPassword: '',
    cnewPassword: '',
  });
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault(); 

    if (updatedPassword.newPassword !== updatedPassword.cnewPassword) {
      setToastMessage("New password and confirm password do not match.");
      setToastType('error');
      resetToast();
      return;
    } else if (updatedPassword.newPassword.length < 6 || updatedPassword.newPassword.length > 12) {
      setToastMessage("Password length should be between 6 and 12.");
      setToastType('error');
      resetToast(); 
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8080/user/update-password/${id}`, updatedPassword);
      console.log(res.data);
      setToastMessage(res.data.message);
      setToastType('success');
      resetToast(); 
    } catch (err) {
      console.log(err.response.data.message);
      setToastMessage(err.response.data.message || 'An error occurred.');
      setToastType('error');
      resetToast(); 
    }
  };

  const resetToast = () => {
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 3000);
  };

  return (
    <>
        
        <form onSubmit={handlePasswordUpdate}>
        <div className="profile-container">
        <h2 className='update-password-title'>Change Password</h2>
        <div className="profile-item">
            <label className="label" htmlFor="current-password">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              id="current-password"
              value={updatedPassword.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              className="input-field"
              required
            />
          </div>
          
          <div  className="profile-item">
            <label className="label" htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              value={updatedPassword.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="input-field"
              required
            />
          </div>
          <div className="profile-item">
            <label className="label" htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="cnewPassword"
              value={updatedPassword.cnewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              className="input-field"
              required
            />
          </div>
          <button className="save-btn" type="submit">Update Password</button>
          </div>
        </form>

      {toastMessage && (
        toastType === 'success' ? (
          <SuccessToast key="201" message={toastMessage} />
        ) : (
          <Toaster key="400" message={toastMessage} />
        )
      )}
    </>
  );
}

export default UpdatePassword;