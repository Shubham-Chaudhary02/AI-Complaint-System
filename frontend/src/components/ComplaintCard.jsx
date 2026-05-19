import { useState } from "react";

import API from "../services/api";

import toast from "react-hot-toast";

function ComplaintCard({
  complaint,
  fetchComplaints,
}) {
  const [status, setStatus] = useState(
    complaint.status
  );

  const deleteHandler = async () => {
    try {
      await API.delete(
        `/complaints/${complaint._id}`
      );

      toast.success("Complaint Deleted");

      fetchComplaints();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const updateStatusHandler = async () => {
    try {
      await API.put(
        `/complaints/${complaint._id}`,
        {
          status,
        }
      );

      toast.success("Status Updated");

      fetchComplaints();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          {complaint.title}
        </h2>

        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {complaint.status}
        </span>
      </div>

      <p className="text-slate-300 mb-4">
        {complaint.description}
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">
            Category
          </p>

          <p className="text-white">
            {complaint.category}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Location
          </p>

          <p className="text-white">
            {complaint.location}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Priority
          </p>

          <p className="text-red-400">
            {complaint.priority}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Department
          </p>

          <p className="text-green-400">
            {complaint.department}
          </p>
        </div>
      </div>

      <div className="mt-5 bg-slate-800 rounded-xl p-4">
        <p className="text-slate-400 text-sm mb-1">
          AI Summary
        </p>

        <p className="text-white text-sm">
          {complaint.summary}
        </p>
      </div>

      <div className="mt-4 bg-slate-800 rounded-xl p-4">
        <p className="text-slate-400 text-sm mb-1">
          AI Response
        </p>

        <p className="text-white text-sm">
          {complaint.aiResponse}
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="flex-1 bg-slate-800 text-white p-3 rounded-xl border border-slate-700"
        >
          <option>Pending</option>

          <option>In Progress</option>

          <option>Resolved</option>
        </select>

        <button
          onClick={updateStatusHandler}
          className="bg-green-600 hover:bg-green-700 px-5 rounded-xl text-white"
        >
          Update
        </button>
      </div>

      <button
        onClick={deleteHandler}
        className="w-full mt-5 bg-red-600 hover:bg-red-700 transition-all duration-300 p-3 rounded-xl text-white font-semibold"
      >
        Delete Complaint
      </button>
    </div>
  );
}

export default ComplaintCard;