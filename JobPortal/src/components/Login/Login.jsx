import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userAuth } from '../../Context/userAuth';
import toast from 'react-hot-toast';

const Login = () => {
  const { setToken, setUser, token } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [value, setValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post('http://localhost:8020/job/login', value, { withCredentials: true });
      const response = login.data;
      if (response.success) {
        toast.success(response.message);

        setToken(response.data.token);
        setUser(response.data.user);

        const role = response.data.user.role;
        if (role === 'jobseeker') {
          navigate('/home');
        } else if (role === 'employee') {
          navigate('/employee');
        } else if (role === 'employer') {
          navigate('/employer');
        } else {
          navigate('/');
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const loginWithGoogle = () => {
    sessionStorage.clear();
    window.open('http://localhost:8020/auth/google/callback', '_self');
  };

  return (
    <section>
      <div className="w-full h-screen font-sans bg-gradient-to-r from-neutral-800 to-stone-500">
        <div className="container flex items-center justify-center flex-1 h-full mx-auto">
          <div className="w-full max-w-lg">
            <div className="leading-snug">
              <form onSubmit={handleSubmit} className="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25">
                <p className="mb-8 text-2xl font-light text-center text-slate-40">Login</p>
                <div className="mb-2">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      onChange={handleChange}
                      value={value.email}
                      placeholder="email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      onChange={handleChange}
                      value={value.password}
                      placeholder="password"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    SUBMIT
                  </button>
                </div>
                <div className="text-center">
                  <Link to="/signup" className="right-0 inline-block align-baseline text-xl hover:text-gray-800">
                    Create an account <span className="text-white font-bold">SIGNUP</span>
                  </Link>
                </div>
              </form>
              <div className="flex items-center justify-center p-2">
                <button
                  className="justify-center items-center w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={loginWithGoogle}
                >
                  CONNECT WITH GOOGLE
                </button>
              </div>
              <Link to="/phone">
                <div className="flex items-center justify-center p-2">
                  <button className="justify-center items-center w-full max-w-sm bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
                    CONNECT WITH PHONE NUMBER
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
