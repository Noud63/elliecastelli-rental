"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CircleX } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      username,
      email,
      password,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false);
          router.push("/signIn");
        }, 5000);
        
      } else if (res.status === 409 || res.status === 400) {
        const dataObj = await res.json();
        console.log(dataObj.message);
        setMessage(dataObj.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      } 
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full min-h-screen mx-auto mt-36 mb-20 px-4 max-xxsm:mt-28">
      <div className="signInBox p-6 rounded-lg shadow-md w-full max-w-[600px] mx-auto  bg-blue-200/20">
        <div className="flex justify-center text-xl text-blue-950 font-bold mb-4 border-b-2 border-dotted border-slate-900 pb-4">
          Register
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
              htmlFor="username"
            >
              Username:
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="mb-4">
            <Label
              className="block text-blue-950 text-md font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="w-full flex flex-row items-center px-4 py-3 rounded-md bg-red-100">
              <CircleX size={20} color="darkred" className="mr-2" />
              <span className="text-red-800">{message}</span>
            </div>
          )}

          {success && (
            <div className="w-full flex flex-row items-center px-4 py-2 rounded-md bg-green-100 mb-2">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Successful registered!</span>
            </div>
          )}

          <div className="mt-4 mb-4">
            <Button
              className="bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 text-white text-md py-6 rounded-lg w-full flex items-center justify-center"
              type="submit"
            >
              <SendHorizontal className="mr-2" /> Register
            </Button>
          </div>

          <div className="w-full mt-4 flex items-center gap-1 font-medium">
            Already an account? <ArrowRight size={16} />
            <Link href="/signIn">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegistrationForm;
