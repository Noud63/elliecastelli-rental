import React from "react";
import {
  FaBed,
  FaRulerCombined,
  FaBath,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import Map from "./Map";

// import dynamic from "next/dynamic";

// const Map = dynamic(() => import("@/components/map"), {
//   ssr: false,
// });


const PropertyDetails = ({ property }) => {

return (
  <main>
    <div className="bg-gradient-to-t from-slate-200 to-white rounded-lg shadow-md text-center md:text-left pb-4">
      <div className="bg-gradient-to-r from-slate-950 via-[#102546] to-slate-950 text-[18px] text-blue-100 font-semibold mb-4 py-3 px-6 rounded-t-lg">
        # {property.name}
      </div>
      <div className="text-gray-500  flex justify-center items-center md:justify-start px-6 border-b border-dotted border-slate-900 pb-3">
        <FaMapMarker className="text-lg text-orange-700 mr-2" />
        <p className="text-orange-700">
          {property.location.street}, {property.location.city},{" "}
          {property.location.state}{" "}
        </p>
      </div>

      <div className="text-lg font-semibold mt-3 text-slate-900 px-6 pb-3 border-b border-dotted border-slate-900">
        Rates & Options:
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-6 pt-4 max-md:justify-center ">
        <div className="w-1/3 flex items-center justify-center mb-4 max-md:pb-2 max-md:mt-2 border-r border-slate-800  max-md:w-full max-md:border-none">
          <div className="text-slate-900 mr-2 text-[18px]">Nightly:</div>
          <div className="text-lg font-medium text-slate-700">
            {property.rates.nightly ? (
              `$${property.rates.nightly.toLocaleString()}`
            ) : (
              <FaTimes className="text-red-700" />
            )}
          </div>
        </div>

        <div className="w-1/3 flex items-center justify-center mb-4 border-r border-slate-800 max-md:w-full max-md:border-none">
          <div className="text-slate-900 mr-2 text-[18px]">Weekly:</div>
          <div className="text-xl font-normal text-slate-700">
            {property.rates.weekly ? (
              `$${property.rates.weekly.toLocaleString()}`
            ) : (
              <FaTimes className="text-red-700" />
            )}
          </div>
        </div>

        <div className="w-1/3 flex items-center justify-center mb-4 max-md:w-full max-md:border-none">
          <div className="text-slate-900 mr-2 text-[18px]">Monthly:</div>
          <div className="text-xl font-normal text-slate-700">
            {property.rates.monthly ? (
              `$${property.rates.monthly.toLocaleString()}`
            ) : (
              <FaTimes className="text-red-700" />
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-t from-blue-50 to-white rounded-lg shadow-md mt-6 pb-4">
      <div className="bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 text-[18px] font-semibold mb-4 text-blue-100 py-3 px-6 rounded-t-lg">
        # Description & Details
      </div>

      <p className="text-gray-600 mb-4 text-[17px] text-center border-b border-dotted border-slate-900 pb-4">
        {property.description}
      </p>
      <div className="flex justify-center gap-4 mb-4 text-xl space-x-9">
        <p>
          <FaBed className="inline-block mr-2 text-slate-500" />
          {property.beds} <span className="hidden sm:inline ">Beds</span>
        </p>
        <p>
          <FaBath className="inline-block mr-2 text-slate-500" />
          {property.baths} <span className="hidden sm:inline">Baths</span>
        </p>
        <p>
          <FaRulerCombined className="inline-block mr-2 text-slate-500" />
          {property.square_feet} <span className="hidden sm:inline">sqft</span>
        </p>
      </div>
    </div>

    <div className="bg-gradient-to-t from-blue-50 to-white rounded-lg shadow-md mt-6 pb-6">
      <div className="bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 py-3 text-lg font-semibold mb-6 rounded-t-lg text-blue-100 pl-6">
        # Amenities
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none  px-6">
        {property.amenities.map((amenity, index) => (
          <li key={index}>
            <FaCheck className="inline-block text-green-600 mr-2" />
            <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
            {amenity}
          </li>
        ))}
      </ul>
    </div>
    <div className="bg-gradient-to-t from-blue-50 to-white p-4 rounded-lg shadow-md mt-6">
      <Map property={property} />
    </div>
  </main>
);
};

export default PropertyDetails;
