import React from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react"; 
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function CommentTableItem({ comment, fetchComments, index }) {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/admin/delete-comment", { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="bg-white/20 hover:bg-white/40 transition-all duration-300 rounded-lg shadow-md">
  {/* Index */}
  <th className="px-4 py-4 text-center font-medium text-gray-900">{index}</th>

  {/* Comment Details */}
  <td className="px-4 py-4 text-gray-800">
    <p><b className="text-gray-600">Blog:</b> {blog.title}</p>
    <p><b className="text-gray-600">Name:</b> {comment.name}</p>
    <p><b className="text-gray-600">Comment:</b> {comment.content}</p>
  </td>

  {/* Date */}
  <td className="px-4 py-4 max-sm:hidden text-gray-500 text-sm">
    {BlogDate.toDateString()}
  </td>

  {/* Approval Status */}
  <td className="px-4 py-4 max-sm:hidden">
    {comment.isApproved ? (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
        <CheckCircle size={14} />
        Approved
      </span>
    ) : (
      <button
        onClick={approveComment}
        className="flex items-center gap-2 px-3 py-1 rounded-md border border-green-500 text-green-600 hover:bg-green-100 transition-all text-sm"
      >
        <CheckCircle size={14} />
        Approve
      </button>
    )}
  </td>

  {/* Actions */}
  <td className="px-4 py-4 text-center flex gap-3 justify-center">
    <button
      onClick={deleteComment}
      className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-red-500 text-red-600 hover:bg-red-100 transition-all text-sm"
    >
      <Trash2 size={18} />
      Delete
    </button>
  </td>
</tr>

  );
}

export default CommentTableItem;
