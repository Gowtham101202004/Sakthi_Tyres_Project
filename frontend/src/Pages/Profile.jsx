import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Software Developer at XYZ Corp.',
    location: 'San Francisco, CA',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="profile-page">
      <button onClick={handleBackClick} className="back-button">
        &#x2190; {/* Left arrow icon */}
      </button>
      <ProfileHeader name={profile.name} />
      {isEditing ? (
        <EditProfile
          profile={profile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <ProfileDetails profile={profile} />
      )}
      <button onClick={toggleEdit} className="edit-button">
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
    </div>
  );
};

const ProfileHeader = ({ name }) => (
  <div className="profile-header">
    <img
      src="https://via.placeholder.com/150"
      alt="Profile"
      className="profile-picture"
    />
    <h2>{name}</h2>
  </div>
);

const ProfileDetails = ({ profile }) => (
  <div className="profile-details">
    <p><strong>Email:</strong> {profile.email}</p>
    <p><strong>Bio:</strong> {profile.bio}</p>
    <p><strong>Location:</strong> {profile.location}</p>
  </div>
);

const EditProfile = ({ profile, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="edit-profile">
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Bio</label>
      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={profile.location}
        onChange={handleChange}
      />
    </div>
    <button type="submit">Save Changes</button>
  </form>
);

export default Profile;
