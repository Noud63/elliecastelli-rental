"use client"
import React, {useState, useEffect} from 'react'
import { FaBullseye } from 'react-icons/fa'
import { toast } from "react-toastify"
import { useGlobalContext } from '@/context/GlobalContext'

const Message = ({message}) => {

const [ isRead, setIsRead ] = useState(message.read)
const [ isDeleted, setIsDeleted] = useState(false)

 const { unreadCount, setUnreadCount } = useGlobalContext();

 console.log(message)

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

  return (
    <div className=" bg-gradient-to-t from-blue-200 via-blue-100 to-white p-4 rounded-md shadow-md border-b-2 border-slate-500">

      <div className="w-full mb-2 flex flex-row justify-between items-center border-b border-dotted border-slate-800 pb-2">
        <h2 className="flex text-xl">
          <span className="flex items-center font-bold">Property Inquiry:</span>
          <span className="ml-2">{message.name}</span>
        </h2>
        {!isRead && (
          <div className="flex items-center bg-blue-950 text-white px-2 py-1 rounded-md">
            New Message
          </div>
        )}
      </div>

      <p className="text-gray-700">
        <strong>Message: </strong>
        <br />
        {message.body}
      </p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
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
          isRead ? "border border-slate-800 bg-blue-200" : "bg-blue-600 text-white"
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
