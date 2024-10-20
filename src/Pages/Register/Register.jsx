import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FaSpinner, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ThemeContext } from '../../Context/ThemeContext'; // Import ThemeContext

const Register = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Use context for dark mode
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();

  const callRegisterAPI = async (userInputs) => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, userInputs);
      console.log(data);
      setSuccessMsg("Success, You're being redirected to login in 1 second");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = Yup.object({
    name: Yup.string().required("Your name is required").min(3, "Name is too short"),
    email: Yup.string().email("Invalid email").required("Your email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid Password, Password starts with a capital letter").required("Password is required!"),
    age: Yup.number().required("Age is required").min(16, "You're too young to register"),
    phone: Yup.string().matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "Invalid phone number"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validateInputs,
    onSubmit: callRegisterAPI,
  });

  return (
    <>
      <div className={`flex flex-col flex-1 justify-center px-6 py-12 lg:px-8 rounded-md w-full max-w-md mx-auto shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Register a new account
          </h2>
          {successMsg && <p className='text-green-400 text-center my-3'>{successMsg}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={registerForm.handleSubmit}>
            {/* Name input */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={registerForm.values.name}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  placeholder='Your Name'
                  className={`block w-full rounded-md border-0 px-2 py-1.5 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6 ${darkMode ? 'text-white bg-gray-700' : 'text-gray-900'}`}
                />
              </div>
              {registerForm.errors.name && registerForm.touched.name && <p className='text-red-500 mt-2'>{registerForm.errors.name}</p>}
            </div>

            {/* Email input */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={registerForm.values.email}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  placeholder='test@gmail.com'
                  className={`block w-full rounded-md border-0 px-2 py-1.5 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6 ${darkMode ? 'text-white bg-gray-700' : 'text-gray-900'}`}
                />
              </div>
              {registerForm.errors.email && registerForm.touched.email && <p className='text-red-500 mt-2'>{registerForm.errors.email}</p>}
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Your Password'
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className={`block w-full rounded-md border-0 px-2 py-1.5 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6 ${darkMode ? 'text-white bg-gray-700' : 'text-gray-900'}`}
                />
              </div>
              {registerForm.errors.password && registerForm.touched.password && <p className='text-red-500 mt-2'>{registerForm.errors.password}</p>}
            </div>

            {/* Age input */}
            <div>
              <label htmlFor="age" className={`block text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Age
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={registerForm.values.age}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  placeholder='Your Age'
                  className={`block w-full rounded-md border-0 px-2 py-1.5 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6 ${darkMode ? 'text-white bg-gray-700' : 'text-gray-900'}`}
                />
              </div>
              {registerForm.errors.age && registerForm.touched.age && <p className='text-red-500 mt-2'>{registerForm.errors.age}</p>}
            </div>

            {/* Phone input */}
            <div>
              <label htmlFor="phone" className={`block text-sm font-medium leading-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder='Your Phone'
                  value={registerForm.values.phone}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className={`block w-full rounded-md border-0 px-2 py-1.5 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6 ${darkMode ? 'text-white bg-gray-700' : 'text-gray-900'}`}
                />
              </div>
              {registerForm.errors.phone && registerForm.touched.phone && <p className='text-red-500 mt-2'>{registerForm.errors.phone}</p>}
            </div>

            {/* Submit button */}
            <div className='mt-4'>
              <button
                type="submit"
                className={`disabled:opacity-60 flex w-full justify-center rounded-md bg-[#005dcb] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isLoading ? 'cursor-not-allowed' : ''}`}
                disabled={!(registerForm.isValid && registerForm.dirty)}
              >
                {isLoading ? <FaSpinner className='text-xl icon-spin' /> : "Register"}
              </button>
              {errorMsg && <p className='text-red-400 text-center my-3'>{errorMsg}</p>}
            </div>

            <p className={`mt-10 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Already have an account?
              <Link to="/login" className={`ml-2 font-semibold leading-6 text-[#005dcb] hover:text-[#003e9f]`}>
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
