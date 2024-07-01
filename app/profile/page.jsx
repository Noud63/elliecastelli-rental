"use client"
import { useState, useEffect} from 'react'
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import  ProfileDefault from "@/assets/images/profile.png"
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const ProfilePage = () => {

const {data:session} = useSession()
const profileImage = session?.user?.image
const profileName = session?.user?.name
const profileEmail = session?.user?.email

console.log(session)

const [properties, setProperties] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {

   const fetchUserProperties = async(userId) => {

    if(!userId) return

    try {
        const res = await fetch(`/api/properties/user/${userId}`)

        if(res.status === 200) {
            const data = await res.json()
            setProperties(data)
            
        }
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false);
    }

   }
   // Fetch user properties when session is available
   if(session?.user?.id){
      fetchUserProperties(session.user.id);
   }
   
},[session])


const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm("Are you sure you want to delete this property")

    if(!confirmed) return

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {method: 'DELETE'}) 

      if(res.status === 200) {

        //Remove the property from state
        const updatedProperty = properties.filter((property) => property._id !== propertyId)

        setProperties(updatedProperty)

        toast.success("Property Deleted!")
      }else{
       toast.error("Failed to delete property!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete property!");
    }
}

  return (
    <section className="pt-32 h-screen">
      <div className="w-full max-w-[800px]  m-auto ">
        <div className="mb-4 shadow-md rounded-xl m-4 md:m-0 signInBox bg-gradient-to-t from-blue-200  to-white">
          <h1 className="pl-4 py-2 text-white text-2xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-500/50 to-slate-900 rounded-t-lg">
            Your Profile
          </h1>
          <div className="flex flex-col md:flex-row pb-8">
            <div className="md:w-1/4 mx-12 mt-2">
              <div className="mb-4">
                <Image
                  className="h-20 w-20 rounded-full mx-auto md:mx-0"
                  src={profileImage || ProfileDefault}
                  width={100}
                  height={100}
                  alt="User"
                />
              </div>
              <h2 className="text-xl mb-4">
                <span className="font-semibold block">Name: </span>
                {profileName}
              </h2>
              <h2 className="text-xl">
                <span className="font-semibold block">Email: </span>
                {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4 pr-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>No property listings here!</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div className="mb-10" key={property._id}>
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-44 w-auto rounded-md object-cover"
                        src={property.images[0]}
                        alt=""
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{properties.name}</p>
                      <p className="text-slate-600">
                        <span className="font-semibold text-slate-700">Address:</span> {property.location.street}{" "}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-900 text-white px-3 py-2 rounded-md mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        className=" bg-red-700 text-white px-3 py-2 rounded-md"
                        type="button"
                        onClick={() => handleDeleteProperty(property._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage
