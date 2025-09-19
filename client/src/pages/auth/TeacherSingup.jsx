import React, { useState } from 'react'
import Header from '../../components/Header';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";


const TeacherSingup = () => {


    
     const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subjectSpecialization: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

    const toggleButtonPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!formData.fullName || !formData.email || !formData.password || !formData.subjectSpecialization) {
        return toast.error("All fields are required");
      }

      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/teacher/signup`,
        formData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success(res.data.message || "Teacher Registered");
        localStorage.setItem("TeacherToken", res.data.token);
        setLoading(false);
        navigate("/", { replace: true });
        window.location.reload();
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        toast.error(err.response.data.message || "Signup Failed");
      } else if (err.request) {
        toast.error("Server not responding. Try again later!");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg mt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-6">
          Teacher Signup
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              />
          </div>


          {/* Subject */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Subject Specialization
            </label>
            <input
              type="text"
              name="subjectSpecialization"
              placeholder="Computer Science, Mathematics, History"
              value={formData.subjectSpecialization}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
          <div className='relative flex items-center justify-center'>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              />
               <span className="absolute right-2 top-5 cursor-pointer" onClick={toggleButtonPassword}>
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition cursor-pointer"
            >
              {loading ? "Signing up..." : "Signup as Teacher"}
            
          </button>
        </form>


        {/* Already Registered */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/teacherlogin" className="text-teal-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
            </>
  )
}

export default TeacherSingup
