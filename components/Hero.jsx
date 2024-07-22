import React from 'react'
import HeroTitle from './HeroTitle'
import InfoBoxes from './InfoBoxes'
import PropertySearchForm from './PropertySearchForm'

const Hero = () => {
  return (
    <div className="w-full max-w-[1372px] flex mt-[140px] mb-20 mx-auto px-4 max-xl:flex-col max-xl:mt-[120px]">
      <HeroTitle />
      <InfoBoxes />
    </div>
  );
}

export default Hero
