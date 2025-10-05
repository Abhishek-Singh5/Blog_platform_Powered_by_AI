import React from "react";
import { Trash2 } from "lucide-react";

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = new Date(date);

  return (
    <tr className="bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300 rounded-lg shadow-md">
      {/* Email */}
      <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
        {email || "No Email"}
      </td>

      {/* Date */}
      <td className="px-6 py-4 hidden sm:block text-gray-500">
        {emailDate.toDateString()}
      </td>

      {/* Action */}
      <td className="px-6 py-4">
        <button
          onClick={() => deleteEmail(mongoId)}
          className="flex items-center gap-2 text-red-600 hover:text-white hover:bg-red-500 px-4 py-2 rounded-full transition-all duration-200 shadow hover:shadow-lg font-medium"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SubsTableItem;
