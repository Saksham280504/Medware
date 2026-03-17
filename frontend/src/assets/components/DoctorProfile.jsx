import React from "react";

const DoctorProfile = ({ doctors }) => {
  return (
    <article className="flex flex-wrap justify-center gap-10 w-full px-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="w-72 min-h-[420px] bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          {/* Doctor Image */}
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
            src={doctor.image_link}
            alt={doctor.name}
          />

          {/* Name */}
          <h5 className="text-xl text-gray-900 font-semibold">
            {doctor.name}
          </h5>

          {/* Speciality */}
          <span className="font-normal text-gray-600">
            {doctor.speciality}
          </span>

          {/* Experience */}
          <div className="mt-1 italic text-gray-500 text-sm">
            {doctor.experience} Years of Experience
          </div>

          {/* Address */}
          <div className="mt-3 text-gray-700 w-full">
            <h2 className="text-base font-semibold">Work Address</h2>
            <p className="italic text-sm h-14 overflow-y-auto mt-1">
              {doctor.work_address}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex mt-4 space-x-3">
            <a
              href={`tel:${doctor.mobile_no}`}
              className="w-24 h-10 flex items-center justify-center text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
            >
              Contact
            </a>

            <button
              className="w-24 h-10 text-sm font-semibold text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50 transition"
              onClick={() => console.log("View profile:", doctor.id)}
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
    </article>
  );
};

export default DoctorProfile;
