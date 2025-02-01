import React, { useState } from 'react';
import "./Profile.css"

const Profile: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [location, setLocation] = useState('Singapore');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+123456789');
  const [whatsapp, setWhatsapp] = useState('+123456789');
  const [bio, setBio] = useState('Not added yet');
  
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value);
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value);


  let profileContent;

  if (!isEditing) {
    profileContent = (
      <div className="profile-info">
        
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Bio:</strong> {bio}</p>

        <ul className="list-group">
          <li className="list-group-item"><strong>Contact:</strong> <a href={`mailto:${email}`}>{email}</a></li>
          <li className="list-group-item"><strong>Phone:</strong> {phone}</li>
          <li className="list-group-item"><strong>WhatsApp:</strong> {whatsapp}</li>
        </ul>

        <button className="btn btn-warning mt-4" onClick={handleEditClick}>Edit Profile</button>
      </div>
    );
  } else {
    profileContent = (
      <div className="profile-info">
        <h5>Edit Profile Information</h5>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="whatsapp">WhatsApp</label>
          <input
            type="text"
            id="whatsapp"
            value={whatsapp}
            onChange={handleWhatsappChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={4}
            value={bio}
            onChange={handleBioChange}
          />
        </div>

        <button className="btn btn-primary mt-4" onClick={handleSaveClick}>Save Changes</button>
      </div>
    );
  }

  return (
    <div>
          <div className="header-bar"></div>

      {profileContent}
    </div>
  );
};

export default Profile;
