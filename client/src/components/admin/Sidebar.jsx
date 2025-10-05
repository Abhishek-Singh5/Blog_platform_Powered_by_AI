import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    { to: "/admin", label: "Dashboard", icon: assets.home_icon },
    { to: "/admin/addBlog", label: "Add Blogs", icon: assets.add_icon },
    { to: "/admin/listBlog", label: "Blog Lists", icon: assets.list_icon },
    { to: "/admin/subscribe", label: "Subscriptions", icon: assets.bell_icon },
    { to: "/admin/comments", label: "Comments", icon: assets.comment_icon },
  ];

  return (
    <div className="bg-gradient-to-b from-[#1b1b29] to-[#26263a] text-gray-200 
                    h-screen w-full md:w-64 py-6 shadow-xl border-r border-gray-700 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-semibold text-center mb-8 text-white tracking-wide">
          Admin Panel
        </h1>

        <div className="flex flex-col space-y-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              end={to === "/admin"}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3.5 px-6 rounded-lg mx-2 transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-indigo-600/20 border-l-4 border-indigo-500 text-indigo-400 shadow-inner"
                    : "hover:bg-indigo-500/10 hover:text-indigo-300"
                }`
              }
            >
              <img
                src={icon}
                alt=""
                className="w-6 h-6 brightness-0 invert opacity-90" // 👈 makes dark icons white
              />
              <p className="hidden md:inline-block font-medium">{label}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mb-4">
        © 2025 Blog Admin
      </div>
    </div>
  );
}

export default Sidebar;
