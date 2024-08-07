"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";

const ResetPasswordForm = () => {
  
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let timer;
    if (success === true || error === true) {
      timer = setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email };

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
        // console.log(dataObj)
        setSuccess(true);
        setPending(false);
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
  };

  return (
    <div className="signInBox mt-40 w-full flex justify-center flex-col max-w-[400px] mx-auto p-4 border-b-2 border-blue-950 rounded-lg bg-blue-100/20">
      <div className="w-full text-xl text-blue-950 font-bold mb-4 flex justify-center border-b-2 border-dotted border-slate-900 pb-4">
        Reset link
      </div>

      <form onSubmit={handleSubmit}>
        <Label htmlFor="email" className="ml-2 mb-2 text-md text-blue-950">
          Email:
        </Label>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          className="focus-visible:ring-0 mb-3 mt-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {success && (
          <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-green-100 mb-3">
            <CircleCheckBig size={20} color="green" className="mr-2" />
            <span className="text-green-600">Reset email sent!</span>
          </div>
        )}

        {error && (
          <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-red-100 mb-3">
            <CircleX size={20} color="darkred" className="mr-2" />
            <span className="text-red-800">User not found!</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full text-md bg-gradient-to-r from-slate-950  via-[#172f54] to-slate-950 py-6 mb-2"
        >
          <LogIn size={20} className="mr-2" />
          {!pending ? "Send" : "Processing...."}
        </Button>
      </form>
    </div>
  );
}

export default ResetPasswordForm
