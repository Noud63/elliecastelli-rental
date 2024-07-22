import React from 'react'
import HomeProperties from '@/components/HomeProperties'
import FeaturedProperties from '@/components/FeaturedProperties'
import Hero from '@/components/Hero'

const HomePage = () => {

  return (
    <>
      <Hero />
      <FeaturedProperties />
      <HomeProperties />
    </>
  )
}

export default HomePage
