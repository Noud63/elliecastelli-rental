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
    const [pageSize, setPageSize] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [width, setWidth] = useState(
      typeof window !== "undefined" && window.innerWidth
    );

    
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

     useEffect(() => {
       const handleResize = () => {
         setWidth(window.innerWidth);
       };
       window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
       
     }, [width]);

useEffect(() => {
console.log(width)
  if (width >= 1024) {
    setPageSize(3);
  }else
  if(width < 1024 && width > 768){
    setPageSize(2)
  }else
  if (width <= 768) {
    setPageSize(1);
  }
},[width])




  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="min-h-screen px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6`}>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
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
