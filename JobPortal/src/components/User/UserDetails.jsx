import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { userAuth } from '../../Context/userAuth';
import toast from 'react-hot-toast';
import Navbar from '../Navbar/Nav';


const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { token } = userAuth();
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access this page.');
      navigate('/');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8020/job/user/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('User not found');
        } else {
          toast.error('Failed to fetch user details.');
        }
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [_id, token, navigate]);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }
  const imageUrl = `http://localhost:8020/uploads/${userDetails.profilePhoto}`;

  return (
    <>
    <Navbar/>
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <img 
            src={imageUrl}
            alt="Profile" 
            className="w-[10rem] h-[10rem] rounded-full mx-auto mb-4"
            onError={(e) => { e.target.src = 'https://i.pinimg.com/474x/7b/73/b0/7b73b0c9c456500e0e6e25a2100be78.jpg'; }}
          />
          <strong >Role:</strong> {userDetails.role}
        </div>
        <div className="mb-4">
          <strong>Name:</strong> {userDetails.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {userDetails.email}
        </div>
        <div className="mb-4">
          <strong>Phone:</strong> {userDetails.phone}
        </div>
        <div className="mb-4">
          <strong>Skills:</strong> {userDetails.skills.join(', ')}
        </div>
       
      </div>
    </div>
    </>
  );
};

export default UserProfile;
