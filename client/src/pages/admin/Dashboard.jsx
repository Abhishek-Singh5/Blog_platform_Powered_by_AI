import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Dashboard() {
  const [dashboardData, setdashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    subscribers: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setdashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    { label: "Blogs", value: dashboardData.blogs, icon: assets.dashboard_icon_1 },
    { label: "Comments", value: dashboardData.comments, icon: assets.dashboard_icon_2 },
    { label: "Subscribers", value: dashboardData.subscribers, icon: assets.desktop_subscribe },
    { label: "Drafts", value: dashboardData.drafts, icon: assets.dashboard_icon_3 },
  ];

  return (
    <div
      className="flex-1 min-h-screen p-4 md:p-5 
                 bg-gradient-to-br from-[#1b1b29] to-[#26263a] 
                 text-white"
    >
      {/* ===== Top Stats Section ===== */}
      <div className="flex flex-wrap gap-5 justify-start">
        {cards.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-xl 
                       border border-white/10 p-5 rounded-2xl 
                       hover:bg-white/20 transition-all duration-300 cursor-pointer
                       w-full sm:w-[270px]"
          >
            <img
              src={item.icon}
              alt={item.label}
              className="w-10 h-10 object-contain" // Removed invert/brightness
            />
            <div>
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="text-white text-sm tracking-wide">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Latest Blogs Section ===== */}
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={assets.dashboard_icon_4}
            alt="Latest Blogs"
            className="w-7 h-7 object-contain"
          />
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Latest Blogs
          </h2>
        </div>

          <div className="relative max-w-5xl overflow-x-auto rounded-xl 
                          border border-white/50 bg-[#1b1b29]">
            <table className="w-full text-m text-white">
              <thead className="bg-[#26263a]">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-white">#</th>
                    <th scope="col" className="px-4 py-3 text-left text-white">Blog Title</th>
                    <th scope="col" className="px-4 py-3 text-left max-sm:hidden text-white">Date</th>
                    <th scope="col" className="px-4 py-3 text-left max-sm:hidden text-white">Status</th>
                    <th scope="col" className="px-4 py-3 text-left text-white">Actions</th>
                  </tr>
                </thead>


              <tbody className="text-white" >
                {dashboardData.recentBlogs.length > 0 ? (
                  dashboardData.recentBlogs.map((blog, index) => (
                    <BlogTableItem
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchDashboard}
                      index={index + 1}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-white/500">
                      No blogs found.
                    </td>
                  </tr>
                )}
              </tbody>



              
            </table>
          </div>

      </div>
    </div>
  );
}

export default Dashboard;
