import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.withCredentials = true;

const SignUp = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        profilePhoto: '',
        name: '',
        age: '',
        dob: '',
        email: '',
        password: '',
        phone: '',
        education: '',
        stream: '',
        companyName: '',
        designation: '',
        years: '',
        skills: '',
        hobbies: '',
        drinkingOrSmoking: '',
        height: '',
        weight: ''
    });

    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto' && files[0]) {
            setValues({ ...values, profilePhoto: files[0] });
            setProfilePhotoPreview(URL.createObjectURL(files[0]));
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendData();
            setIsModalOpen(true); // Open the role selection modal
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const sendData = async () => {
        const {
            name, email, password, phone, education, stream,
            companyName, designation, years, skills, hobbies,
            drinkingOrSmoking, height, weight, dob
        } = values;

        const formData = new FormData();
        formData.append('profilePhoto', values.profilePhoto);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('education', education);
        formData.append('stream', stream);
        formData.append('companyName', companyName);
        formData.append('designation', designation);
        formData.append('years', years);
        formData.append('skills', skills);
        formData.append('hobbies', hobbies);
        formData.append('drinkingOrSmoking', drinkingOrSmoking);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('dob', dob);

        const res = await axios.post("http://localhost:8020/job/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res.data;
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setIsModalOpen(false);
        toast.success(`Role selected: ${role}`);
        navigate("/");
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    };

    return (
        <section>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <form className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-4">Profile Form</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Profile Photo</label>
                            <input
                                type="file"
                                name="profilePhoto"
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                onChange={handleChange}
                            />
                            {profilePhotoPreview && (
                                <img
                                    src={profilePhotoPreview}
                                    alt="Profile Preview"
                                    className="mt-4 w-24 h-24 rounded-full object-cover"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                            <input
                                type="number"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={values.dob}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Education</label>
                            <select
                                name="education"
                                value={values.education}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select Education</option>
                                <option value="10th">10th</option>
                                <option value="12th">12th</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Stream</label>
                            <input
                                type="text"
                                name="stream"
                                value={values.stream}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={values.companyName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                value={values.designation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
                            <input
                                type="number"
                                name="years"
                                value={values.years}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Skills</label>
                            <input
                                type="text"
                                name="skills"
                                value={values.skills}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 font-semibold mb-2">Hobbies</label>
                            <input
                                type="text"
                                name="hobbies"
                                value={values.hobbies}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Drinking or Smoking</label>
                            <select
                                name="drinkingOrSmoking"
                                value={values.drinkingOrSmoking}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select an option</option>
                                <option value="Drinking">Drinking</option>
                                <option value="Smoking">Smoking</option>
                                <option value="Rarely Smoking">Rarely Smoking</option>
                                <option value="Rarely Drinking">Rarely Drinking</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={values.height}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={values.weight}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                    <h3 className="mt-6  text-2xl object-center ">Already have an account? <Link className='text-blue-500 hover:to-blue-300' to="/">Login</Link></h3>
                </form>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Select Your Role</h2>
                            <button
                                onClick={() => handleRoleSelect('Employee')}
                                className="block w-full mb-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Employee
                            </button>
                            <button
                                onClick={() => handleRoleSelect('Employer')}
                                className="block w-full mb-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Employer
                            </button>
                            <button
                                onClick={() => handleRoleSelect('Job Seeker')}
                                className="block w-full mb-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Job Seeker
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="block w-full mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SignUp;
