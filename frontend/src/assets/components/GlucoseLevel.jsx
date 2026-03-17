import React from "react";

const GlucoseLevel = ({ responseData }) => {
  // Guard clause
  if (
    !responseData ||
    !responseData.blood_glucose ||
    !responseData.blood_glucose.date ||
    responseData.blood_glucose.date.length === 0
  ) {
    return (
      <p className="w-full h-40 grid place-content-center italic text-gray-500">
        No values in log
      </p>
    );
  }

  const { date, before, after } = responseData.blood_glucose;

  const getCellStyles = (value, isAfterColumn) => {
    if (!value) return "";

    if (isAfterColumn) {
      if (value > 180) return "bg-red-100 text-red-700 font-semibold";
    } else {
      if (value > 120) return "bg-red-100 text-red-700 font-semibold";
    }

    return "";
  };

  let prevDate = null;

  return (
    <div className="px-2 bg-white rounded-lg shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b font-semibold text-left">
              Date
            </th>
            <th className="py-2 px-4 border-b font-semibold text-center">
              Before
            </th>
            <th className="py-2 px-4 border-b font-semibold text-center">
              After
            </th>
          </tr>
        </thead>

        <tbody>
          {date.map((currentDate, index) => {
            const currentBefore = before[index];
            const currentAfter = after[index];

            // Skip empty rows
            if (!currentBefore && !currentAfter) return null;

            const isFirstDate = prevDate !== currentDate;
            prevDate = currentDate;

            return (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                {/* Date Column */}
                <td
                  className={`py-2 px-4 border-r text-gray-800 ${
                    isFirstDate ? "bg-sky-100 font-medium" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isFirstDate && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                    <span>{currentDate}</span>
                  </div>
                </td>

                {/* Before Column */}
                <td
                  className={`py-2 px-4 border-r text-center ${getCellStyles(
                    currentBefore,
                    false
                  )}`}
                >
                  {currentBefore || "-"}
                </td>

                {/* After Column */}
                <td
                  className={`py-2 px-4 text-center ${getCellStyles(
                    currentAfter,
                    true
                  )}`}
                >
                  {currentAfter || "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GlucoseLevel;
