import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">
        AI Complaint System
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() =>
            navigate("/add-complaint")
          }
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
        >
          Add Complaint
        </button>

        <button
          onClick={logoutHandler}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;