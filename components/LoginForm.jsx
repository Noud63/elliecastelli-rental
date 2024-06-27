"use client"
import React,{useState} from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook
} from "@tabler/icons-react";
import Link from "next/link";
import { LogIn, ArrowRight, Eye, EyeOff, Mail } from "lucide-react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


const LoginForm = () => {

 const [isView, setIsView] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const router = useRouter()
 const { data: session} = useSession()

 const user = session?.user;
 if (user) redirect("/");

 const handleSubmit = async(e) => {
    e.preventDefault()

   try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

console.log(res)
      
     if(res.ok === 200) {
        toast.success("Successfully logged in!")
        router.push("/")
     }

     if(!res.ok){
         toast.success("Invalid email or password!");
     }
   } catch (error) {
    toast.error("Login error!");
     console.log(error, {message: error.message})
   } finally {
    setEmail("")
    setPassword("")
   }
 }

 return (
   <div className="signInBox mt-40 w-full flex justify-center flex-col max-w-[400px] mx-auto p-4 border-2 border-white rounded-lg">
     <h3 className="w-full text-xl text-blue-900 font-bold mb-4 flex justify-center">
       Login
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
       <Label htmlFor="email" className="ml-3 my-2 text-md text-blue-900">
         Password:
       </Label>
       <div className="relative">
         <Input
           type={isView ? "text" : "password"}
           value={password}
           placeholder="**************"
           className="mb-4 focus-visible:ring-0 mt-2"
           onChange={(e) => setPassword(e.target.value)}
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

       <Button
         type="submit"
         className="w-full text-md bg-gradient-to-r from-slate-600 via-blue-500 to-slate-600 py-6 mb-2"
       >
         <LogIn size={20} className="mr-2" />
         Login
       </Button>

       <div className="w-full mt-2 flex items-center gap-1 text-gray-600">
         Don't have an account? <ArrowRight size={16} />
         <Link href="/register">Register</Link>
       </div>

       <div className="w-full mt-2 flex items-center gap-1 text-gray-600">
         Forgot your password? <ArrowRight size={16} className="ml-1" />
         <Link href="/resetpassword">Reset password</Link>
       </div>

       <div className="relative w-full h-[1px] bg-blue-900 mt-8 mb-4 flex justify-center items-center">
         <div className="absolute w-[30px] h-[30px] rounded-full bg-white flex justify-center">
           or
         </div>
       </div>
     </form>

     <Link href="/emailLogin">
       <Button
         className="w-full text-md text-blue-950 bg-slate-200 py-6 mt-4 mr-2 flex justify-start hover:bg-slate-200"
       >
         <Mail size={20} className="text-blue-900 mr-3" /> Login with Email
       </Button>
     </Link>

     <Button
       className="w-full text-md text-blue-950 bg-slate-200 py-6 mt-2 flex justify-start hover:bg-slate-200"
       onClick={() => signIn("facebook", { email, password })}
     >
       <IconBrandFacebook className="text-blue-900 mr-2" /> Login with Facebook
     </Button>

     <Button
       className="w-full text-md text-blue-950 bg-slate-200 py-6 flex justify-start hover:bg-slate-200 mt-2"
       onClick={() => signIn("google", { email, password })}
     >
       <IconBrandGoogle className="text-blue-900 mr-2" />
       Login with Google
     </Button>
   </div>
 );
}

export default LoginForm
