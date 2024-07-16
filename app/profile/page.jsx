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

console.log(session.user)

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


const editProfile = async () => {

    try {
           const res = await fetch("/api/editprofile", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({username: profileName, email:profileEmail}),
           });

            console.log(res)

    } catch (error) {
    console.log(error);
    }

}


  return (
    <section className="pt-32 min-h-screen flex justify-center">
      <div className="w-full max-w-[800px] mx-6 mb-44">
        <div className="shadow-md rounded-xl m-4 md:m-0 signInBox bg-gradient-to-t from-blue-200 to-white">
          <h1 className="pl-4 py-2 text-white text-xl font-semibold mb-4 bg-gradient-to-r from-slate-950  via-[#172f54] to-slate-950 rounded-t-lg">
            Your Profile
          </h1>
          <div className="flex flex-col md:flex-row pb-8 max-md:px-6">
            <div className="md:w-1/4 mx-6 mt-2 max-md:mx-0 max-md:mb-6 border-b border-dotted border-slate-800 pb-4">
              <div className="mb-4 max-md:border-b border-dotted border-slate-800 max-md:pb-4">
                <Image
                  className="h-16 w-16 rounded-full mx-auto md:mx-0 cursor-pointer"
                  src={profileImage || ProfileDefault}
                  width={100}
                  height={100}
                  alt="User"
                />
              </div>
              <h2 className="text-xl mb-4">
                <span className="font-semibold text-[18px] block">Name: </span>
                <span className="text-[18px]">{profileName}</span>
              </h2>
              <h2 className="text-xl">
                <span className="font-semibold text-[18px] block">Email: </span>
                <span className="text-[18px]">{profileEmail}</span>
              </h2>

              <button
                className="w-full rounded-lg bg-blue-700 text-white mt-4 py-2"
                onClick={editProfile}
              >
                Edit profile
              </button>
            </div>

            <div className="md:w-3/4 pr-8 max-md:pr-0">
              <h2 className="text-xl font-semibold mb-4 pb-2">
                Your Listings:
              </h2>
              {!loading && properties.length === 0 && (
                <p>No property listings here!</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div
                    className="mb-6 border-b border-dotted border-slate-800 pb-6 max-md:pb-8"
                    key={property._id}
                  >
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className=" w-auto rounded-md object-cover"
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
                        <span className="font-semibold text-slate-700">
                          Address:
                        </span>{" "}
                        {property.location.street}, {property.location.city},{" "}
                        {property.location.state}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-row">
                      <button className="bg-green-700 text-white w-[80px] py-2 rounded-md mr-2">
                        <Link href={`/properties/${property._id}/edit`}>
                          Edit
                        </Link>
                      </button>

                      <button
                        className=" bg-red-700 text-white w-[80px] py-2 rounded-md"
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
