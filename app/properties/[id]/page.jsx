"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchSingleProperty } from '@/utils/request'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import Link from 'next/link'
import PropertyDetails from '@/components/PropertyDetails'
import {FaArrowCircleLeft, FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import Spinner from '@/components/Spinner'
import PropertyImages from '@/components/PropertyImages'
import BookmarkButton from '@/components/BookmarkButton'
import ShareButtons from '@/components/ShareButtons'
import PropertyContactForm from '@/components/PropertyContactForm'

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
          <div className="w-full max-w-[1350px] flex flex-row m-auto py-6 pl-10 bg-slate-900 mt-20 text-blue-50 items-center">
            <FaArrowRight className="mr-2" />
            {property.type}, {property.location.city}
          </div>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="w-full max-w-[1350px] m-auto py-6 pl-10 bg-slate-900">
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
