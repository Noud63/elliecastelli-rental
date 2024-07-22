import React from 'react'
import { fetchProperties } from '@/utils/request'
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedProperties = async () => {

    const properties = await fetchProperties({ showFeatured: true });

  return (
    properties.length > 0 && (
      <section className="bg-gradient-to-r from-slate-950 via-slate-800/40 to-slate-950 pt-6 pb-24 mt-10 px-4">
        <div className="w-full max-w-[1340px] mx-auto max-md:max-w-[340px]">
          <h2 className="text-3xl font-bold text-white mt-6 mb-12 max-xl:text-center max-md:text-2xl">
            Highlighted Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
}

export default FeaturedProperties
