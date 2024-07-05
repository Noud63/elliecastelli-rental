import React from 'react'
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker} from "react-icons/fa"
import Image from 'next/image';

const FeaturedPropertyCard = ({property}) => {

     const getRateDisplay = () => {
       const { rates } = property;

       if (rates.monthly) {
         return `${rates.monthly.toLocaleString()} p/m`;
       } else if (rates.weekly) {
         return `${rates.weekly.toLocaleString()} p/w`;
       } else if (rates.nightly) {
         return `${rates.nightly.toLocaleString()} p/n`;
       }
     };


  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_6px_rgba(23,37,84,.9)] bg-gradient-to-t from-blue-200 via-white to-white">
      <div className="flex flex-row max-lg:flex-col">
        <div className="w-full relative">
          <Image
            src={property.images[0]}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover h-full rounded-l-xl rounded-r-none max-lg:rounded-b-none max-xlg:rounded-t-xl w-full pt-[43px]"
          />
          <div className="w-full absolute top-0 left-0 bg-slate-950 rounded-tl-xl px-4 h-[43px] 
          text-blue-100 font-bold flex justify-start items-center md:text-center max-lg:rounded-t-xl">
            ${getRateDisplay()}
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full bg-blue-900/40 flex justify-center items-center text-xl h-[43px] 
          max-xl:text-lg rounded-tr-xl max-md:text-xl font-bold max-lg:rounded-tr-none">
            {property.name}
          </div>
          <div className="w-full flex justify-center font-semibold text-gray-600 mb-4 border-b border-dotted border-slate-800 pb-3 mt-3">
            {property.type}
          </div>

          <div className="flex justify-center gap-4 text-gray-500 mb-4  px-6 ">
            <p>
              <FaBed className="inline-block mr-1" /> {property.beds}{" "}
              <span className="md:hidden lg:inline">Beds</span>
            </p>
            <p>
              <FaBath className="inline-block mr-1" /> {property.baths}{" "}
              <span className="md:hidden lg:inline">Baths</span>
            </p>
            <p>
              <FaRulerCombined className="inline-block mr-1" />
              {property.square_feet}{" "}
              <span className="md:hidden lg:inline">sqft</span>
            </p>
          </div>

          <div className="flex justify-center gap-4 text-green-900 text-sm mb-4 border-b border-dotted border-slate-800 pb-5">
            {property.rates.nightly && (
              <p>
                {" "}
                <FaMoneyBill className="inline mr-2" />
                Nightly
              </p>
            )}
            {property.rates.weekly && (
              <p>
                {" "}
                <FaMoneyBill className="inline mr-2" />
                Weekly
              </p>
            )}
            {property.rates.monthly && (
              <p>
                {" "}
                <FaMoneyBill className="inline mr-2" />
                Monthly
              </p>
            )}
          </div>

          <div className="flex justify-between items-center max-md:flex-col pb-4 px-4">
            <div className="w-full flex align-middle gap-2 max-md:flex-start max-md:mb-2">
              <FaMapMarker className="text-lg text-orange-700" />
              <span className="text-orange-700">
                {" "}
                {property.location.city} {property.location.state}
              </span>
            </div>
            <Link
              href={`/properties/${property._id}`}
              className="bg-slate-950 text-blue-200 px-6 py-1 rounded-lg text-center text-sm max-md:w-full"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPropertyCard
