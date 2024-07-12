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

 console.log(session)

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
   <div className="w-full mx-auto mt-40 px-4">
     <div className="signInBox bg-blue-200/20 w-full flex flex-col max-w-[400px] p-4 rounded-lg my-40 pb-12 mx-auto">
       <div className="w-full text-xl text-blue-950 font-bold mb-4 flex justify-center border-b-2 border-dotted border-slate-900 pb-4">
         Login
       </div>

       <form onSubmit={handleSubmit}>
         <Label htmlFor="email" className="ml-3 mb-2 text-md text-blue-950">
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
         <Label htmlFor="email" className="ml-3 my-2 text-md text-blue-950">
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
           className="w-full text-md bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 py-6 mb-2"
         >
           <LogIn size={20} className="mr-2 text-blue-100" />
           <span className="text-blue-100">Login</span>
         </Button>

         <div className="w-full mt-2 flex items-center gap-1 text-blue-950 font-semibold">
           Don't have an account? <ArrowRight size={16} />
           <Link href="/register">Register</Link>
         </div>

         <div className="w-full mt-2 flex items-center gap-1 text-blue-950 font-semibold">
           Forgot your password? <ArrowRight size={16} className="ml-1" />
           <Link href="/resetpassword">Reset password</Link>
         </div>

         <div className="relative w-full h-[1px] bg-blue-950 mt-8 mb-4 flex justify-center items-center">
           <div className="absolute w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center pb-1 mb-1">
             or
           </div>
         </div>
       </form>

       <Link href="/emailLogin">
         <Button className="w-full text-md text-blue-100  bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 py-6 mt-4 mr-2 flex justify-start">
           <Mail size={20} className="text-blue-100 mr-3" /> Login with Email
         </Button>
       </Link>

       <Button
         className="w-full text-md text-blue-100 bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 py-6 mt-2 flex justify-start"
         onClick={() => signIn("facebook", { email })}
       >
         <IconBrandFacebook className="text-blue-100 mr-2" /> Login with
         Facebook
       </Button>

       <Button
         className="w-full text-md text-blue-100  bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 py-6 flex justify-start mt-2"
         onClick={() => signIn("google", { email })}
       >
         <IconBrandGoogle className="text-blue-100 mr-2" />
         Login with Google
       </Button>
     </div>
   </div>
 );
}

export default LoginForm
