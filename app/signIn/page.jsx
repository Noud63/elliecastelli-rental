"use client"
import { useState } from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from 'next/link';
import { LogIn, ArrowRight, Eye, EyeOff  } from "lucide-react";


const SignInPage = () => {

const [isView, setIsView] = useState(false);

  return (
    <div className="h-screen relative">
      {/* <div className="fixed top-0 h-screen w-full bg-[url('/images/realestatebg.jpg')] bg-cover opacity-15 -z-[999]" /> */}
      <div className="signInBox mt-40 w-full flex justify-center flex-col max-w-[400px] mx-auto p-4 border-2 border-white rounded-lg">
        <h3 className="w-full text-xl text-blue-900 font-bold mb-6 flex justify-center">
          Login
        </h3>
        <Label htmlFor="email" className="ml-3 mb-2 text-md text-blue-900">
          Email:
        </Label>
        <Input
          type="email"
          placeholder="Email"
          className="focus-visible:ring-0"
        />
        <Label htmlFor="email" className="ml-3 my-2 text-md text-blue-900">
          Password:
        </Label>
        <div className="relative">
          <Input
            type={isView ? "text" : "password"}
            placeholder="**************"
            className="mb-4 focus-visible:ring-0"
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

        <Button className="w-full text-md bg-gradient-to-r from-slate-600 via-blue-500 to-slate-600 py-6 mb-2">
          <LogIn size={20} className="mr-2" />
          Login
        </Button>

        <Button className="w-full text-md text-blue-950 bg-slate-200 py-6 mb-2 mt-4 flex justify-start hover:bg-slate-200">
          <IconBrandGithub className="text-blue-900 mr-2" /> Login with Github
        </Button>

        <Button className="w-full text-md text-blue-950 bg-slate-200 py-6 flex justify-start hover:bg-slate-200 ">
          <IconBrandGoogle className="text-blue-900 mr-2" />
          Login with Google
        </Button>

        <div className="w-full mt-4 flex items-center gap-1">
          Don't have an account? <ArrowRight size={16} />
          <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage
