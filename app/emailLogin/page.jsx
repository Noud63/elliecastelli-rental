"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { LogIn, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const EmailLoginPage = () => {
  const [email, setEmail] = useState("");

  const { data: session} = useSession()

useEffect(() => {
    if(session?.user){
        redirect("/")
    }
  }, [session]);

  return (
    <div className="signInBox mt-40 w-full flex justify-center flex-col max-w-[400px] mx-auto p-4 border-2 border-white rounded-lg">
      <h3 className="w-full text-xl text-blue-900 font-bold mb-4 flex justify-center">
        Login with email
      </h3>

      <form>
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

        {/* <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-green-100 mb-2">
            <CircleCheckBig size={20} color="green" className="mr-2" />
            <span className="text-green-600">Reset email sent!</span>
          </div>
          
         <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-red-100 mb-2">
            <CircleX size={20} color="darkred" className="mr-2" />
            <span className="text-red-800">User not found!</span>
          </div>
         */}

        <Button
          type="button"
          className="w-full text-md bg-gradient-to-r from-slate-600 via-blue-500 to-slate-600 py-6 my-2"
          onClick={() => signIn("email", { email })}
        >
          <LogIn size={20} className="mr-2" />
          Login
        </Button>
      </form>

      <div className="w-full mt-2 flex items-center gap-1 text-gray-600">
        Not registered yet <ArrowRight size={16} />
        <Link href="/register">Register</Link>
      </div>

      <div className="w-full flex items-center gap-1 py-2 text-gray-600">
        Back to login page
        <ArrowRight size={16} />
        <Link href="/signIn">Login</Link>
      </div>
    </div>
  );
};

export default EmailLoginPage;

//  onClick={() => signIn("email", { email })}
