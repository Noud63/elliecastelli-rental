"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, ArrowRight, Eye, EyeOff} from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";
import { useRouter, useParams} from "next/navigation";

const UpdatePasswordForm = () => {

  const [isView, setIsView] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { token } = useParams()

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPending(true)

    try {
           const res = await fetch("/api/updatepassword", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({newPassword, token}),
           }); 

          if(res.status === 200){
            setPending(false)
            setSuccess(true)
            setTimeout(() => {
                router.push("/signIn");
                setSuccess(false)
            },3000)
            
          }
          
    } catch (error) {
      console.log(error, { message: error.message });
    } finally {
      setNewPassword("");
      setRepeatPassword("");
    }
  };

  return (
    <div className="w-full mx-auto mt-40 px-4 ">
      <div className="signInBox bg-blue-200/20 w-full flex flex-col max-w-[400px] p-4 rounded-lg my-40 pb-12 mx-auto border-b-2 border-blue-950">
        <div className="w-full text-xl text-blue-950 font-bold mb-4 flex justify-center border-b-2 border-dotted border-slate-900 pb-4">
          Reset password
        </div>

        <form onSubmit={handleSubmit}>
          <Label htmlFor="email" className="ml-3 mb-2 text-md text-blue-950">
            New password:
          </Label>
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            className="mb-2 mt-2 outline-none focus-visible:ring-0"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Label htmlFor="email" className="ml-3 my-2 text-md text-blue-950">
            Repeat Password:
          </Label>
          <div className="relative">
            <Input
              type={isView ? "text" : "password"}
              value={repeatPassword}
              placeholder="**************"
              className="mt-2 outline-none focus-visible:ring-0"
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            {isView ? (
              <Eye
                className="absolute right-4 top-3 z-10 cursor-pointer text-gray-500"
                size={20}
                onClick={() => setIsView(!isView)}
              />
            ) : (
              <EyeOff
                className="absolute right-4 top-3 z-10 cursor-pointer text-blue-800"
                size={20}
                onClick={() => setIsView(!isView)}
              />
            )}
          </div>

          {success && (
            <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-green-100 mb-2 mt-4">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Password updated!</span>
            </div>
          )}

          {error && (
            <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-red-100 mb-2 mt-4">
              <CircleX size={20} color="darkred" className="mr-2" />
              <span className="text-red-800">User not found!</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full text-md bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 py-6 mt-2"
          >
            <LogIn size={20} className="mr-2 text-blue-100" />
            <span className="text-blue-100">{pending ? "Processing..." : "Reset password"}</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
