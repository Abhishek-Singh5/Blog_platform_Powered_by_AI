import SubsTableItem from "../../components/admin/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data?.emails || []);
    } catch (err) {
      toast.error("Failed to load subscriptions");
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: { id: mongoId },
      });

      if (response.data?.success) {
        toast.success(response.data?.msg || "Deleted successfully");
        fetchEmails();
      } else {
        toast.error(response.data?.msg || "Error deleting subscription");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-6 px-6 sm:pt-12 sm:pl-16 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
        📩 All Subscriptions
      </h1>

      <div className="relative max-w-4xl mx-auto bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto overflow-y-auto h-[75vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-full text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700 sticky top-0 z-20 shadow-sm">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Email
                </th>
                <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {emails.length > 0 ? (
                emails.map((item, index) => (
                  <SubsTableItem
                    key={item._id || index}
                    mongoId={item._id}
                    email={item.email}
                    date={item.date}
                    deleteEmail={deleteEmail}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-12 text-center text-gray-500 font-medium"
                  >
                    No subscriptions found 🚫
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
