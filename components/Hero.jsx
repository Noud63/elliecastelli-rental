import React from 'react'
import PropertySearchForm from './PropertySearchForm'

const Hero = () => {
  return (
    <section className="pb-20 pt-[140px] mb-4 bg-gradient-to-r from-slate-900 via-blue-500 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find Your Dream Rental
          </h1>
          <p className="my-4 text-xl text-white">
            Experience joyful living.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  );
}

export default Hero
