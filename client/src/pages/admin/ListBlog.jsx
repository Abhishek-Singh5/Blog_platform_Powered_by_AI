import React, { useEffect, useState } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-6 px-6 sm:pt-12 sm:pl-16 bg-gradient-to-br from-blue-50/50 to-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">📝 All Blogs</h1>

      <div className="relative max-w-5xl mx-auto overflow-x-auto shadow-2xl rounded-2xl bg-white/90 backdrop-blur-lg border border-gray-200">
        <table className="w-full text-sm text-gray-700 rounded-2xl overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-100 via-white to-blue-50 text-gray-700 uppercase text-xs sticky top-0 z-20 shadow-sm">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">#</th>
              <th scope="col" className="px-4 py-3 text-left">Blog Title</th>
              <th scope="col" className="px-4 py-3 text-left max-sm:hidden">Date</th>
              <th scope="col" className="px-4 py-3 text-left max-sm:hidden">Status</th>
              <th scope="col" className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  fetchBlogs={fetchBlogs}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500 font-medium">
                  No blogs found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog;
