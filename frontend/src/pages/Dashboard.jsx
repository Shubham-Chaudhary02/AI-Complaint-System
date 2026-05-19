import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import ComplaintCard from "../components/ComplaintCard";

import API from "../services/api";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("");

  const fetchComplaints = async () => {
    try {
      let url = "/complaints";

      if (search) {
        url = `/complaints/search/location?location=${search}`;
      }

      const response = await API.get(url);

      let data = response.data;

      if (filter) {
        data = data.filter(
          (item) =>
            item.category.toLowerCase() ===
            filter.toLowerCase()
        );
      }

      setComplaints(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Complaint Dashboard
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by Location"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white flex-1"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white"
          >
            <option value="">
              Filter Category
            </option>

            <option value="water">
              Water
            </option>

            <option value="electricity">
              Electricity
            </option>

            <option value="garbage">
              Garbage
            </option>
          </select>

          <button
            onClick={fetchComplaints}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl text-white"
          >
            Search
          </button>
        </div>

        {complaints.length === 0 ? (
          <div className="text-center text-slate-400 text-2xl mt-20">
            No Complaints Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                fetchComplaints={fetchComplaints}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;