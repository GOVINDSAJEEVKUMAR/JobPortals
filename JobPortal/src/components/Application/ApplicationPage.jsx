import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Nav';
import { useParams } from 'react-router-dom';
import { userAuth } from '../../Context/userAuth';

const JobApplicationForm = ({ employerId }) => {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const { _Id } = useParams();
  const { user } = userAuth();

  const jobseekerId = user && user._id;
  

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage('Please upload your resume.');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', _Id);
    formData.append('jobseekerId', jobseekerId);
    formData.append('employerId', employerId);
    formData.append('resume', resume);
    console.log("Job ID :", _Id);
    console.log("Jobseeker ID :", jobseekerId);
    console.log("Employer ID :", employerId);
    
    

    try {
      const response = await axios.post(`http://localhost:8020/apply/apply/${_Id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setResume(null); // Reset file input after submission
      e.target.reset(); // Reset the form visually
      console.log(response.data);
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while applying.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
            <input 
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Apply
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </>
  );
};

export default JobApplicationForm;
