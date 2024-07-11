"use client"
import React,{useState, useEffect} from 'react'
import { FaBookmark} from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import {toast} from 'react-toastify'

const BookmarkButton = ({property}) => {

  const { data: session} = useSession()
  const userId = session?.user?.id

  const [ isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading ] = useState(true)

  useEffect(() => {

    if(!userId) {
      setIsLoading(false)
      return
    }

    const checkBookmarkStatus = async () => {

        try {
          const res = await fetch("/api/bookmarks/check", {
            method: "POST",
            headers: { "Content-Type": "aplication/json" },
            body: JSON.stringify({ propertyId: property._id }),
          });

          if (res.status === 200) {
            const data = await res.json();
            setIsBookmarked(data.isBookmarked);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false)
        }
    }

    checkBookmarkStatus()

  },[property._id, userId])

  const handleClick = async() => {
      if(!userId){
        toast.error("You need to sign in to bookmark!")
        return
      }

      try {
             const res = await fetch("/api/bookmarks", {
              method: "POST",
              headers: {'Content-Type': 'aplication/json'},
              body: JSON.stringify({propertyId: property._id})
             })

             if(res.status === 200 ){
              const data = await res.json()
              toast.success(data.message)
              setIsBookmarked(data.isBookmarked)
             }
      } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
      }
  }

  if(isLoading) return <p className="text-center">Loading...</p>

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-800 border border-red-900 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center w-full"
    >
      <FaBookmark className="fas fa-bookmark mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white font-bold w-full py-3 px-4 rounded-full flex items-center justify-center border-b border-green-800"
    >
      <FaBookmark className="fas fa-bookmark mr-2" /> Bookmark Property
    </button>
  );
}

export default BookmarkButton
