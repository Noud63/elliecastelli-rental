"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/Input'
import {Label} from '@/components/ui/label'
import { SendHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const RegistrationForm = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      username,
      email,
      password
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
        toast.success("Successfull Registration");
        // setWasSubmitted(true);

        // setTimeout(() => {
        //   setWasSubmitted(false);
        // }, 5000);
      } else if (res.status === 400 || res.status === 401) {
        const dataObj = await res.json();
        toast.error(dataObj.message);
      } else {
        toast.error("Error sending form");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
    } finally {
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-[120px] w-full max-w-[600px] mx-auto border border-gray-200 ">
      <h3 className="flex justify-center text-xl text-blue-900 font-bold mb-6">
        Register
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            className="block text-blue-900 text-md font-bold mb-2"
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
            className="block text-blue-900 text-md font-bold mb-2"
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
            className="block text-blue-900 text-md font-bold mb-2"
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
            className="block text-blue-900 text-md font-bold mb-2"
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

        <div className="mt-8 mb-4">
          <Button
            className="bg-gradient-to-r from-slate-600 via-blue-500 to-slate-600 text-white text-md py-6 rounded-lg w-full flex items-center justify-center"
            type="submit"
          >
            <SendHorizontal className="mr-2" /> Register
          </Button>
        </div>

        <div className="w-full mt-4 flex items-center gap-1">
          Already an account? <ArrowRight size={16} />
          <Link href="/signIn">Login</Link>
        </div>

      </form>
    </div>
  );
};
export default RegistrationForm;