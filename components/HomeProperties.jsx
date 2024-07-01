import React from 'react'
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/request';


const HomeProperties = async () => {

const data = await fetchProperties()

const recentProperties = data.properties.slice(0,6);

  return (
    <div className="w-full ">
      <section className="px-4 py-6 pt-20">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Recent Properties
          </h2>
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
      </section>
      <section className="m-auto max-w-[475px] mt-12 pb-28 px-6">
        <a
          href="/properties"
          className="block bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 text-blue-200 text-center font-medium py-4 rounded-xl"
        >
          View All Properties
        </a>
      </section>
    </div>
  );
}

export default HomeProperties
