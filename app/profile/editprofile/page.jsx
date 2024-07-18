"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizontal } from "lucide-react";
import { CircleX } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { useSession } from "next-auth/react";
import { getInfo } from "@/utils/getUserInfo";
import { useRouter } from "next/navigation";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: session } = useSession();

  const router = useRouter()

  useEffect(() => {
    const userData = async (id) => {
      const res = await getInfo(id);
      if (res) {
        setName(res.name);
        setEmail(res.email);
        setUserName(res.userName);
      }
    };
    if (session?.user?.id) {
      userData(session.user.id);
    }
  }, [session]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
    };

    try {
      const res = await fetch("/api/editprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push(`/profile`);
        }, 3000);
      } else if (res.status === 409 || res.status === 400) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-auto mt-40 px-4">
      <div className="signInBox p-6 rounded-lg shadow-md w-full max-w-[600px] mx-auto  bg-blue-200/20">
        <div className="flex justify-center text-xl text-blue-950 font-bold mb-4 border-b-2 border-dotted border-slate-900 pb-4">
          Edit profile
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              className="block text-blue-950 text-md font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label
              className="block text-blue-950 text-md font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="w-full flex flex-row items-center px-4 py-3 rounded-md bg-red-100">
              <CircleX size={20} color="darkred" className="mr-2" />
              <span className="text-red-800">Failed to update!</span>
            </div>
          )}

          {success && (
            <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-green-100 mb-2">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Successful updated!</span>
            </div>
          )}

          <div className="mt-4 mb-4">
            <Button
              className="bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 text-white text-md py-6 rounded-lg w-full flex items-center justify-center"
              type="submit"
            >
              <SendHorizontal className="mr-2" /> Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfilePage;
