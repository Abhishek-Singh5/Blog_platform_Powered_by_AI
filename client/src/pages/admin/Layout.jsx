import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext.jsx";

function Layout() {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1b1b29] text-white">
      {/* ===== Top Bar ===== */}
      <div className="flex items-center justify-between px-4 sm:px-9 h-17 border-b border-gray-700 bg-[#26263a]">
        {/* Logo (separated from nav) */}
        <div className="flex items-center">
          <img
            src={assets.logo}
            alt="Logo"
            className='w-20 sm:w-24 cursor-pointer transition-transform duration-300 hover:scale-[1.03] drop-shadow-sm rounded-full'
            onClick={() => navigate("/")}
          />
        </div>


        {/* Logout Button */}
        <div>
          <button
            onClick={logout}
            className="text-sm px-6 py-2 bg-primary hover:bg-primary/90 transition-all rounded-full shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex flex-1 h-[calc(100vh-80px)] overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-gradient-to-br from-[#1b1b29] to-[#26263a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
