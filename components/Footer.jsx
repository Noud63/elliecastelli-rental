import React from 'react'
import Image from 'next/image';
import logo from "@/assets/images/ellielogoblue.png"

const Footer = () => {

    const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full relative flex justify-center bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 h-[500px] py-4">
      <div className="w-full max-w-[1400px] flex justify-between items-center md:flex-row max-md:flex-col max-md:justify-around px-12">
        
        <div className="w-36 flex flex-col items-center text-white">
          <Image
            src={logo}
            alt="Logo"
            className="h-20 w-auto"
            width={0}
            height={0}
            size="100vw"
          />
          <span className="w-full mt-2 text-2xl text-blue-200 font-ChopinScript">
            Ellie Castelli
          </span>
        </div>

        <div className="flex text-white max-md:justify-center">
          <span className="mt-2 text-2xl text-blue-200">
            Rental Division Inc
          </span>
        </div>

        <div className="w-full flex justify-center absolute bottom-0 left-0">
          <p className="flex p-4 text-sm text-blue-300/50 mt-2 md:mt-0 max-sm:flex-col max-sm:items-center">
            <span>&copy;{currentYear} Ellie Castelli Rental Division. </span>{" "}
            <span>All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
