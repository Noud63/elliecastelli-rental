"use client"
import React, {useState, useEffect} from 'react'
import { FaBullseye } from 'react-icons/fa'
import { toast } from "react-toastify"
import { useGlobalContext } from '@/context/GlobalContext'

const Message = ({message}) => {

const [ isRead, setIsRead ] = useState(message.read)
const [ isDeleted, setIsDeleted] = useState(false)

 const { unreadCount, setUnreadCount } = useGlobalContext();

const handleReadClick = async () => {
     try {
         const res = await fetch(`/api/messages/${message._id}`, {
          method: "PUT",
         })

         if(res.status === 200) {
          const { read } = await res.json()
          
          setIsRead(read)
          setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1))
          if(read){
            toast.success("Marked as Read!")
          }else{
            toast.success("Marked as new!")
          }
         }
     } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
     }
}

const handleDeleteClick = async () => {
  try {
    const res = await fetch(`/api/messages/${message._id}`, {
      method: "DELETE"
    })

    if(res.status === 200){
      setIsDeleted(true);
      setUnreadCount((prevCount) => prevCount -1)
      toast.success("Message deleted!")
    }
  } catch (error) {
      console.log(error)
      toast.error("Message was not deleted!")
  }
}

if(isDeleted){
  return null
}

console.log(message)

  return (
    <div className=" bg-blue-100/60 p-4 rounded-md shadow-md border-b-2 border-slate-500">
      {!isRead && (
        <div className="hidden items-center bg-gradient-to-r from-slate-950  via-[#172f54] to-slate-950 text-white px-2 py-1 rounded-md max-sm:flex max-sm:mb-2">
          New Message
        </div>
      )}
      <div className="w-full mb-2 flex flex-row justify-between items-center border-b border-dotted border-slate-800 pb-2 ">
        <div className="flex text-xl max-sm:flex-col">
          <span className="flex items-center font-bold">Property inquiry:</span>
          <span className="ml-2 max-sm:ml-0 max-sm:text-[18px]">
            {message.property.name}
          </span>
        </div>

        {!isRead && (
          <div className="flex items-center bg-blue-950 text-white px-2 py-1 rounded-md max-sm:hidden">
            New Message
          </div>
        )}
      </div>

      <div className="text-gray-700">
        <strong>Message: </strong>
        <br />
        <div className="bg-white min-h-20 p-2 rounded-md mt-2 border border-blue-900/30">
          {message.body}
        </div>
      </div>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-600">
            {" "}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-600">
            {" "}
            {message.phone}
          </a>
        </li>
        <li className="border-b border-dotted border-slate-800 pb-4">
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}h
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead
            ? "border border-slate-800 bg-blue-200"
            : "bg-blue-600 text-white"
        }  py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-700 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}

export default Message

