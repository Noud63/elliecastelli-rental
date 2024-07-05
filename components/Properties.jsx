"use client"
import React,{useState, useEffect} from 'react'
import { fetchProperties} from '@/utils/request';
import PropertyCard from './PropertyCard';
import Spinner from './Spinner';
import Pagination from './Pagination';

const Properties = () => {

    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(8)
    const [totalItems, setTotalItems] = useState(0)

    
  useEffect(() => {
        const getProperties = async () => {
         try {
        const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`)

        if(!res.ok){
            throw new Error("Failed to fetch data!")
        }

        const data = await res.json()  // data is an object
        setProperties(data.properties)
        setTotalItems(data.total)
       } catch (error) {
        console.log(error)
       }finally {
        setLoading(false)
       }
        }
        getProperties()

       
    },[page, pageSize])  // rerender when page changes!

    const handlePageChange = (newPage) => {
          setPage(newPage)
    }



  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="min-h-screen px-4 py-6 w-full max-xxl:max-w-[1000px] max-xxl:mx-auto max-md:flex">
      <div className="max-w-[1440px] w-full m-auto px-4 py-6 max-md:max-w-[390px] max-md:px-2">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-4 gap-6`}
          >
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                loading={loading}
              />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default Properties
