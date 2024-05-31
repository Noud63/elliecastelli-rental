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
    <div className="bg-white rounded-xl shadow-[0px_4px_6px_rgba(23,37,84,.9)]">
      <div className="relative flex flex-row max-lg:flex-col">
        <Image
          src={property.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover rounded-l-xl rounded-r-none max-lg:rounded-b-none max-lg:rounded-t-xl w-full lg:w-2/5"
        />
        <div className="w-full p-6 flex flex-col">
          <h3 className="w-full flex justify-center text-xl max-xl:text-lg max-md:text-xl font-bold ">
            {property.name}
          </h3>
          <div className="w-full flex justify-center text-gray-600 mb-4">
            {property.type}
          </div>
          <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
            ${getRateDisplay()}
          </h3>
          <div className="flex justify-center gap-4 text-gray-500 mb-4">
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

          <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
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

          <div className="border border-gray-200 mb-5"></div>

          <div className="flex justify-between items-center max-md:flex-col">
            <div className="w-full flex align-middle gap-2 max-md:flex-start max-md:mb-2">
              <FaMapMarker className="text-lg text-orange-700" />
              <span className="text-orange-700">
                {" "}
                {property.location.city} {property.location.state}
              </span>
            </div>
            <Link
              href={`/properties/${property._id}`}
              className="h-[36px] bg-gradient-to-t from-blue-900 via-blue-500 to-blue-300 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm max-md:w-full"
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
