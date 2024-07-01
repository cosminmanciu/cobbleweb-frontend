// src/components/Profile.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(user)
    const [imagesLoaded, setImagesLoaded] = useState(false);


    const getImageUrl = (url) => {
        console.log(url)
        if (!url) return '/default-image.jpg';
        return `http://localhost:80${url}`;
    };

    return (

        <div className="profile-page">
            <h2>{user.fullName}'s Profile</h2>
            {user.avatar && (
                <div className="avatar">
                    <img
                        className="avatar-img"
                        src={getImageUrl(user.avatar)}
                        alt="Avatar"
                        onLoad={() => setImagesLoaded(true)}
                        style={{ display: imagesLoaded ? 'block' : 'none' }}
                    />
                </div>
            )}
            <div className="carousel">

                {user.photos.map((photo, index) => (
                    <div key={index} className="carousel-item">
                        <img

                            src={getImageUrl(photo.url)}
                            alt={`Photo ${index + 1}`}
                            onLoad={() => setImagesLoaded(true)}
                            style={{ display: imagesLoaded ? 'block' : 'none' }}
                        />
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Profile;