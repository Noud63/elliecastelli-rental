import React from 'react'
import PropertySearchForm from './PropertySearchForm'
import Services from './Services';

const HeroTitle = () => {
  return (
    <section className="w-full flex flex-col">
      <div className="w-full h-[168px] flex flex-col justify-center max-xl:items-center max-xl:h-auto">
        <div className="">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Rent Your Dream
          </h1>
          <p className="my-4 text-xl text-white max-xl:text-center">
            Experience joyful living
          </p>
        </div>
      </div>
      <div>
        <Services />
      </div>
      <div className="hidden max-xl:flex max-xl:w-full mx-auto max-xl:my-4">
        <PropertySearchForm />
      </div>
    </section>
  );
}

export default HeroTitle