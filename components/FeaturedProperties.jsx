import React from 'react'
import { fetchProperties } from '@/utils/request'
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedProperties = async () => {

    const properties = await fetchProperties({ showFeatured: true });

  return (
    properties.length > 0 && (
      <section className="bg-gradient-to-r from-slate-900 via-blue-500 to-slate-900 px-4 pt-6 pb-24 mt-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-white mt-6 mb-12 text-center">
            Featured Properties
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
