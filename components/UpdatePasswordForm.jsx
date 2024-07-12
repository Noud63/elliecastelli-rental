"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn, ArrowRight, Eye, EyeOff} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";


const UpdatePasswordForm = () => {

  const [isView, setIsView] = useState(false);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const router = useRouter();
  const { data: session } = useSession();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);

      if (res.ok === 200) {
        toast.success("Successfully logged in!");
        router.push("/");
      }

      if (!res.ok) {
        toast.success("Invalid email or password!");
      }
    } catch (error) {
      toast.error("Login error!");
      console.log(error, { message: error.message });
    } finally {
      setEmail("");
      setPassword("");
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
            Password:
          </Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            className="mb-2 mt-2 outline-none focus-visible:ring-0"
            onChange={(e) => setPassword(e.target.value)}
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

          <Button
            type="submit"
            className="w-full text-md bg-gradient-to-r from-slate-950  via-[#102546] to-slate-950 py-6 mt-4"
          >
            <LogIn size={20} className="mr-2 text-blue-100" />
            <span className="text-blue-100">Reset password</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
