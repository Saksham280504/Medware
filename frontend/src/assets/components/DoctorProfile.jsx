import React from "react";

const DoctorProfile = ({ doctors }) => {
  return (
    <article className="flex flex-wrap justify-center gap-8 w-full max-w-7xl px-4 stagger-children">
      {doctors.map((doctor, idx) => (
        <div
          key={doctor.id}
          className="w-72 min-h-[450px] bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-cyan-300 animate-fade-in-up group"
          style={{animationDelay: `${idx * 0.05}s`}}
        >
          {/* Doctor Image */}
          <div className="relative mb-4 overflow-hidden rounded-full w-28 h-28 bg-gray-100">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src={doctor.image_link}
              alt={doctor.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Name */}
          <h5 className="text-2xl text-slate-900 font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {doctor.name}
          </h5>

          {/* Speciality */}
          <span className="font-medium text-cyan-600 text-sm bg-cyan-100/50 px-3 py-1 rounded-full mt-2">
            {doctor.speciality}
          </span>

          {/* Experience */}
          <div className="mt-3 text-slate-600 text-sm font-medium">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {doctor.experience} Years Experience
            </span>
          </div>

          {/* Address */}
          <div className="mt-4 text-slate-700 w-full">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Work Address</h2>
            <p className="text-sm leading-relaxed h-16 overflow-y-auto bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              {doctor.work_address}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex mt-6 gap-3 w-full">
            <a
              href={`tel:${doctor.mobile_no}`}
              className="flex-1 h-11 flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transform"
            >
              Contact
            </a>

            <button
              className="flex-1 h-11 text-sm font-semibold text-cyan-600 border-2 border-cyan-600 rounded-lg hover:bg-cyan-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transform"
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
