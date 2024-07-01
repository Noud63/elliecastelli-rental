import React from 'react'
import Image from 'next/image';
import logo from "@/assets/images/ellielogoblue.png"

const Footer = () => {

    const currentYear = new Date().getFullYear()
  return (
    <footer className="relative flex bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 h-[500px] py-4">
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center px-4 md:flex-row max-md:flex-col max-md:justify-around">
        <div className="w-22 flex flex-col items-center text-white">
          <Image src={logo} alt="Logo" className="h-20 w-auto" />
          <span className="w-full mt-2 text-2xl text-blue-200 font-ChopinScript">
            Ellie Castelli
          </span>
        </div>
        <div className="w-22 flex flex-col items-center text-white">
          <span className="w-full mt-2 text-2xl text-blue-200">
            Rental Division Inc
          </span>
        </div>

        <div className="w-full flex justify-center absolute bottom-0 left-0">
          <p className="p-4 text-sm text-blue-300/50 mt-2 md:mt-0">
            &copy;{currentYear} Ellie Castelli Rental Division. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
