import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker} from 'react-icons/fa'
import Spinner from './Spinner';

const PropertyCard = ({property, loading}) => {

  const getRateDisplay = () => {
    const { rates } = property

    if(rates.monthly){
      return `${rates.monthly.toLocaleString()},- p/m`
    }else if(rates.weekly){
      return `${rates.weekly.toLocaleString()},- p/w`
    }else if(rates.nightly){
      return `${rates.nightly.toLocaleString()},- p/n`
    }

  }

  return (
    <div
      className="w-full max-w-[380px] md:max-w-full rounded-xl relative shadow-[0px_3px_6px_rgba(23,37,84,.7)] 
    bg-gradient-to-t from-blue-200 via-white to-white  border-b-2 border-slate-900"
    >
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <Image
          src={property.images[0]}
          alt=""
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-auto mt-10"
          priority={true}
        />
      )}
      <div className="">
        <div className="text-left md:text-center mb-5 border-b border-dotted border-slate-900 pb-2">
          <h3 className="text-xl text-center font-bold bg-blue-900/40 py-2">{property.name}</h3>
          <div className="text-gray-600 text-center font-medium pt-2">{property.type}</div>
        </div>
        <h3 className="w-full absolute top-0 right-0 bg-slate-900 px-4 py-3 rounded-t-lg text-blue-100 text-lg font-semibold text-left md:text-center lg:text-left">
          ${getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" /> {property.beds}{" "}
            <span className=" lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2" /> {property.baths}{" "}
            <span className=" lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet}{" "}
            <span className=" lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4 border-b border-dotted border-slate-800 pb-6">
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

        <div className="flex justify-between items-center max-md:flex-col mb-4 px-4">
          <div className="w-full flex align-middle gap-2 max-md:flex-start max-md:mb-4">
            <FaMapMarker className="text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className=" bg-slate-950 text-blue-200 px-8 py-1 rounded-lg text-center text-sm max-md:w-full"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard
