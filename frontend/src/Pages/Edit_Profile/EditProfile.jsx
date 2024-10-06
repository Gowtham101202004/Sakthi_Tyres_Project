import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import axios from 'axios';
import Toaster from '../../Form/Toaster';
import SuccessToast from '../../Form/SuccessToast';
import { Backdrop, CircularProgress, IconButton, Modal, Box, Button } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import UpdatePassword from './UpdatePassword';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar-edit';

import DefaultProfile from './default-profile.png'
import EditImg from './edit-img.png';
import SaveImg from './save-img.png';
import Edit from './edit.gif';
import Save from './save.gif';

const locations = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", 
  "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", 
  "Thanjavur", "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli", 
  "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
  "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", 
  "Virudhunagar"
];

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    location: '',
    phno: '',
    fullname: '',
    profileImage: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [id, setId] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditable, setIsEditable] = useState(false); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState(''); 
  const [preview, setPreview] = useState(null); 
  const [isImageEditorVisible, setIsImageEditorVisible] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = localStorage.getItem('userdata');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData?._id) {
          setIsLoading(true);
          try {
            const response = await axios.get(`http://localhost:8080/user/get-user-info/${parsedData._id}`);
            console.log(response);
            setUserData(response.data);
            setId(response.data._id);
            if (response.data.profileImage) {
              setPreview(response.data.profileImage);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setIsLoading(false);
          }
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
        setToastType('');
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [toastMessage, toastType]);

  const handleProfileUpdate = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
    const isValidPhone = userData.phno ? /^[0-9]{10}$/.test(userData.phno) : true;
    const isFullNameValid = userData.fullname.trim().length > 0;
    const isAddressValid = userData.address.trim().length > 0;
  
    if (!isValidEmail) {
      setToastMessage("Invalid email format.");
      setToastType('error');
      return;
    }
    
    if (!isValidPhone) {
      setToastMessage("Phone number must be 10 digits.");
      setToastType('error');
      return;
    }
  
    if (!isFullNameValid) {
      setToastMessage("Full name cannot be empty.");
      setToastType('error');
      return;
    }
  
    if (!isAddressValid) {
      setToastMessage("Address cannot be empty.");
      setToastType('error');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const updatedData = { ...userData };
      if (preview) {
        updatedData.profileImage = preview; 
      }

      const response = await axios.put(`http://localhost:8080/user/update-profile/${id}`, updatedData);
      localStorage.setItem('userData', JSON.stringify({data: response.data.data, status: response.status}));
      console.log(response.data.data);
      setToastMessage("Profile updated successfully.");
      setToastType('success');
      setIsEditable(false); 
    } catch (error) {
      console.error("Error updating profile:", error);
      setToastMessage("Error updating profile.");
      setToastType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'location') {
      const filteredSuggestions = locations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (location) => {
    setUserData((prevData) => ({
      ...prevData,
      location,
    }));
    setSuggestions([]);
  };

  const toggleEditMode = () => {
    if (isAnimating) return;

    if (isEditable) {
      setIsAnimating(true);
      setAnimationType('save');
      setTimeout(() => {
        setIsAnimating(false);
        handleProfileUpdate();
      }, 2000); 
    } else {
      setIsAnimating(true);
      setAnimationType('edit');
      setTimeout(() => {
        setIsAnimating(false);
        setIsEditable(true);
      }, 2000); 
    }
  };

  // Avatar handlers
  const handleAvatarCrop = (croppedImage) => {
    resizeImage(croppedImage, 100, 100, (resizedImage) => {
      setPreview(resizedImage);
    });
  };

  const handleAvatarBeforeFileLoad = (elem) => {
    if(elem.target.files[0].size > 1048576){ // 1MB
      alert("File is too big! Maximum size allowed is 1MB.");
      elem.target.value = "";
    };
  };

  const resizeImage = (base64Str, maxWidth, maxHeight, callback) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL());
    };
  };

  const openImageEditor = () => {
    setIsImageEditorVisible(true);
  };

  const cancelImageEdit = () => {
    setIsImageEditorVisible(false);
    setPreview(userData.profileImage || null); // Revert to original image
  };

  const confirmImageEdit = () => {
    setIsImageEditorVisible(false);
    // The preview state already holds the cropped image
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || isSubmitting}>
        <CircularProgress />
      </Backdrop>

      <div className="whole-edit-profile-container">
        <form>
          <div className="profile-container">
            <div className="profile-title-container">
              <IconButton onClick={() => navigate('/')} className='back-icon-container'>
                <KeyboardBackspaceIcon className='back-icon'/>
              </IconButton>
              <h2>Edit Profile</h2>
              <div onClick={toggleEditMode} className='edit-icon-container' style={{ cursor: isAnimating ? 'not-allowed' : 'pointer' }}>
                {isAnimating ? (
                  animationType === 'edit' ? (
                    <img src={Edit} className='edit-anim-icon' alt="Editing..." />
                  ) : (
                    <img src={Save} className='save-anim-icon' alt="Saving..." />
                  )
                ) : (
                  isEditable ? (
                    <img src={SaveImg} className='save-icon' alt="Save" />
                  ) : (
                    <img src={EditImg} className='edit-icon' alt="Edit" />
                  )
                )}
              </div>
            </div>

            {/* Profile Picture Section */}
            <div className="profile-picture-section">
              <div className="current-profile-picture">
                <img 
                  src={preview || DefaultProfile} 
                  alt="Profile" 
                  className="profile-picture" 
                  onClick={isEditable ? openImageEditor : null} 
                />
              </div>
            </div>
            <Modal
              open={isImageEditorVisible}
              onClose={cancelImageEdit}
              aria-labelledby="avatar-editor-modal"
              aria-describedby="modal-to-edit-profile-picture"
            >
              <Box className="modal-box">
                <Avatar
                  width={390}
                  height={295}
                  onCrop={handleAvatarCrop}
                  onBeforeFileLoad={handleAvatarBeforeFileLoad}
                  src={userData.profileImage || null}
                />
                <div className="image-editor-buttons">
                  <Button onClick={cancelImageEdit} className="cancel-button">
                    Cancel
                  </Button>
                  <Button onClick={confirmImageEdit} className="ok-button" disabled={!preview}>
                    OK
                  </Button>
                </div>
              </Box>
            </Modal>
            <div className="profile-item">
              <label className="label">Username</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled
                className="input-field"
              />
            </div>

            <div className="profile-item">
              <label className="label">Full name</label>
              <input
                type="text"
                name="fullname"
                value={userData.fullname}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!isEditable} 
              />
            </div>

            <div className="profile-item">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!isEditable}
              />
            </div>

            <div className="profile-item">
              <label className="label">Phone number</label>
              <input
                type="text"
                name="phno"
                placeholder="Enter your phone number"
                value={userData.phno}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!isEditable}
              />
            </div>

            <div className="profile-item">
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={userData.location}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!isEditable}
              />
            </div>

            {suggestions.length > 0 && isEditable && (
              <div className="suggestions-dropdown">
                {suggestions.map((location, index) => (
                  <div 
                    key={index} 
                    className="suggestion-item" 
                    onClick={() => handleSuggestionClick(location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}

            <div className="profile-item">
              <label className="label">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={userData.address}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!isEditable}
              />
            </div>
          </div>
        </form>

        {toastMessage && (
          toastType === 'success' ? (
            <SuccessToast message={toastMessage} />
          ) : (
            <Toaster message={toastMessage} />
          )
        )}

        <UpdatePassword />
      </div>
    </>
  );
};

export default EditProfile;
