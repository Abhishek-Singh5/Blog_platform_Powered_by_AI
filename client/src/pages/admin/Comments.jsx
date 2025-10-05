import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

function Comments() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      const commentList = data.comments || data.comment || [];

      if (data.success && Array.isArray(commentList)) {
        setComments(commentList);
      } else {
        setComments([]);
        toast.error(data.message || "Failed to load comments");
      }
    } catch (error) {
      setComments([]);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-br from-blue-50/40 to-white/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Comments</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("Approved")}
            className={`px-4 py-1 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
              filter === "Approved" ? "bg-green-100 text-green-700" : "bg-white text-gray-700 hover:bg-green-50"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`px-4 py-1 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
              filter === "Not Approved" ? "bg-red-100 text-red-700" : "bg-white text-gray-700 hover:bg-red-50"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-xl rounded-2xl bg-white/90 backdrop-blur-lg border border-gray-200">
        <table className="w-full text-sm text-gray-600 rounded-2xl overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-100 via-white to-blue-50 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden text-left">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(comments || [])
              .filter((comment) => filter === "Approved" ? comment.isApproved : !comment.isApproved)
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comments;
