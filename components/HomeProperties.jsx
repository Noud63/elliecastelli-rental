import React from 'react'
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/request';


const HomeProperties = async () => {

const data = await fetchProperties()

const recentProperties = data.properties.slice(0,6);

  return (
    <>
      <section className="w-full flex flex-col py-6 pt-20 px-4">
        <div className="w-full max-w-[1340px] mx-auto max-md:max-w-[340px]">
          <h2 className="text-3xl font-bold mb-12 max-md:text-2xl text-white max-xl:text-center">
            Recent Properties
          </h2>
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
              {recentProperties.length === 0 ? (
                <p>No properties found!</p>
              ) : (
                recentProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full max-w-[475px] mt-12 flex justify-center pb-28 mx-auto">
        <a
          href="/properties"
          className="bg-gradient-to-r from-slate-950  via-[#0c1d38] to-slate-950 
          text-blue-200 text-center font-medium py-4 rounded-xl  mx-auto px-6"
        >
          View All Properties
        </a>
      </section>
    </>
  );
}

export default HomeProperties
