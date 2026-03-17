import React from "react";

const MedicalHistory = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center">
        <h2 className="text-xl p-2 w-full text-center text-gray-800 font-semibold">
          Medical History
        </h2>
        <p className="w-full h-full bg-teal-50 grid place-content-center text-gray-600">
          None
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full rounded-lg shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-gray-800 bg-gray-100">
            <th className="py-3 px-4 font-semibold text-left">
              Medical History
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3 px-5 text-gray-800 text-base md:text-lg">
                {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalHistory;
