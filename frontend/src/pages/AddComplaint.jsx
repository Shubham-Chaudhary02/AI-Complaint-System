import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import API from "../services/api";

function AddComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
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
      await API.post(
        "/complaints",
        formData
      );

      toast.success(
        "Complaint Submitted Successfully"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="flex justify-center items-center p-10">
        <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-800">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Register Complaint
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Complaint Title"
              className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Complaint Description"
              rows="5"
              className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"
              onChange={handleChange}
              required
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-4 rounded-xl text-white font-semibold">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddComplaint;