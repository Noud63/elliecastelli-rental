"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchSingleProperty } from '@/utils/request'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import Link from 'next/link'
import Image from 'next/image'
import PropertyDetails from '@/components/PropertyDetails'
import {FaArrowCircleLeft, FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import Spinner from '@/components/Spinner'
import PropertyImages from '@/components/PropertyImages'
import BookmarkButton from '@/components/BookmarkButton'
import ShareButtons from '@/components/ShareButtons'
import PropertyContactForm from '@/components/PropertyContactForm'
import logo from '@/assets/images/ellielogo3.png'

const PropertyPage = () => {

  const { id } = useParams()

  const [ property, setProperty ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const fetchProperty = async () => {
      if(!id){
        return
      }
      try {
        const property = await fetchSingleProperty(id);
        setProperty(property);
      } catch (error) {
        console.error('Error fetching property:', error)
      }finally {
        setLoading(false)
      }
    }

    if(property === null){
        fetchProperty();
    }
    
 },[id, property])
 

 if(!property && !loading){
     return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found!
      </h1>
     )
 }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <div className="w-full max-w-[1350px] flex flex-row justify-between m-auto py-3 px-6 bg-gradient-to-r from-slate-950  via-[#0c1d38] to-slate-950 mt-28 text-blue-50 items-center rounded-t-xl">
            <div className="flex flex-row items-center">
              # {property.type}, {property.location.city}
            </div>

            <div className="w-8">
              <Image src={logo} width={0} height={0} size="100vw" alt="logo" />
            </div>
          </div>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="w-full max-w-[1350px] m-auto py-4 pl-6 bg-gradient-to-r from-slate-950  via-[#0c1d38] to-slate-950 rounded-b-xl">
              <Link
                href="/properties"
                className="text-blue-100 hover:text-blue-200 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>

          <section className="">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />

                  <ShareButtons property={property} />

                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
}

export default PropertyPage
