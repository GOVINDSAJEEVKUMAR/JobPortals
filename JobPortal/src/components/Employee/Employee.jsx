// src/JobForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Navbar/Nav';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    lastDate: '',
    skills: '',
    experienceFrom: '',
    experienceTo: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8020/employee/addjob', formData);
      setSuccess('Job added successfully!');
      console.log('Form submitted:', response.data);
      // Reset form
      setFormData({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        type: '',
        lastDate: '',
        skills: '',
        experienceFrom: '',
        experienceTo: '',
      });
    } catch (error) {
      setError('Error adding job. Please try again.');
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
   
    <>
    <Nav/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <form
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Job Form</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {[
          { label: 'Title', name: 'title', type: 'text', placeholder: 'Enter job title' },
          { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Enter job description' },
          { label: 'Company', name: 'company', type: 'text', placeholder: 'Enter company name' },
          { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter job location' },
          { label: 'Salary', name: 'salary', type: 'text', placeholder: 'Enter salary' },
          { label: 'Last Date', name: 'lastDate', type: 'date', placeholder: '' },
          { label: 'Skills Required', name: 'skills', type: 'text', placeholder: 'Enter required skills' },
          { label: 'Experience From', name: 'experienceFrom', type: 'number', placeholder: 'Years of experience from' },
          { label: 'Experience To', name: 'experienceTo', type: 'number', placeholder: 'Years of experience to' },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default JobForm;
