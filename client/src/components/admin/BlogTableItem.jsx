import React from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react"; 
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function BlogTableItem({ blog, fetchBlogs, index }) {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 rounded-xl shadow-md">
      {/* Index */}
      <th className="px-4 py-4 text-center font-semibold text-gray-900">{index}</th>

      {/* Title */}
      <td className="px-4 py-4 text-gray-800 font-medium">{title}</td>

      {/* Date */}
      <td className="px-4 py-4 max-sm:hidden text-gray-500 text-sm">
        {BlogDate.toDateString()}
      </td>

      {/* Status Badge */}
      <td className="px-4 py-4 max-sm:hidden">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            blog.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {blog.isPublished ? (
            <CheckCircle size={14} className="text-green-700" />
          ) : (
            <XCircle size={14} className="text-orange-700" />
          )}
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-center flex gap-3 justify-center">
        {/* Publish/Unpublish Button */}
        <button
          onClick={togglePublish}
          className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border font-medium text-sm transition-all shadow-sm
            ${
              blog.isPublished
                ? "border-red-500 text-red-500 hover:bg-red-500/10"
                : "border-green-500 text-green-500 hover:bg-green-500/10"
            }`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        {/* Delete Button */}
        <button
          onClick={deleteBlog}
          className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 transition-all shadow-sm"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BlogTableItem;
