import React from 'react'
import PropertySearchForm from './PropertySearchForm'

const Hero = () => {
  return (
    <section className="pt-[140px] max-md:pt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Rent Your Dream
          </h1>
          <p className="my-4 text-xl text-white">Experience joyful living.</p>
        </div>
        <div className="hidden max-xl:flex max-xl:w-full mx-auto max-xl:my-4"><PropertySearchForm /></div>
      </div>
    </section>
  );
}

export default Hero
