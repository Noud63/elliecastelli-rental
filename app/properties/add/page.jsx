import React from 'react'
import PropertyAddForm from '@/components/PropertyAddForm';

const PropertyAddPage = () => {
  return (
    <section className="min-h-screen bg-blue-50">
      <div className="container m-auto max-w-2xl py-28">
        <div className="bg-white pb-8 mb-4 shadow-[0px_2px_8px_rgba(0,0,0,.3)] rounded-t-xl m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
}

export default PropertyAddPage
