import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-[400px] border border-slate-700">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          AI Complaint System
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Welcome Back
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-4 rounded-xl text-white font-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;