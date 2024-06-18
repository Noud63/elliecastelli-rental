"use client"
import React,{useState, useEffect} from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn, ArrowRight} from "lucide-react";
import { toast } from 'react-toastify';
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";

const ResetPasswordPage = () => {

const [email, setEmail] = useState("");
const [pending, setPending] = useState(false)
const [success, setSuccess] = useState(false)
const [error, setError] = useState(false)

useEffect(() => {
   if(success === true || error === true ) {
    const timer = setTimeout(() => {
 setSuccess(false)
 setError(false)
    }, 5000)
    return () => {
      clearTimeout(timer);
    };
   }
},[success, error])

const handleSubmit = async(e) => {
    e.preventDefault()

    const data = {email}

    try {
        setPending(true);
      const res = await fetch("/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        const dataObj = await res.json();
        console.log(dataObj)
        setSuccess(true);
        setPending(false)
      } else if (res.status === 404) {
         setError(true);
        setPending(false);
      } else {
         setError(true);
        setPending(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
      setPending(false);
    } finally {
      setEmail("");
    }
}

  return (
    <div className="signInBox mt-40 w-full flex justify-center flex-col max-w-[400px] mx-auto p-4 border-2 border-white rounded-lg">
      <h3 className="w-full text-xl text-blue-900 font-bold mb-4 flex justify-center">
        Reset Password
      </h3>

      <form onSubmit={handleSubmit}>
        <Label htmlFor="email" className="ml-3 mb-2 text-md text-blue-900">
          Email:
        </Label>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          className="focus-visible:ring-0 mb-2 mt-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {success && (
          <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-green-100 mb-2">
            <CircleCheckBig size={20} color="green" className="mr-2" />
            <span className="text-green-600">Reset email sent!</span>
          </div>
        )}

        {error && (
          <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-red-100 mb-2">
            <CircleX size={20} color="darkred" className="mr-2" />
            <span className="text-red-800">User not found!</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full text-md bg-gradient-to-r from-slate-600 via-blue-500 to-slate-600 py-6 mb-2"
        >
          <LogIn size={20} className="mr-2" />
          {!pending ? "Reset" : "Processing...."}
        </Button>
      </form>

      <Link href="/signIn">
        <div className="w-full flex justify-center mt-2">Login</div>
      </Link>
    </div>
  );
}

export default ResetPasswordPage
