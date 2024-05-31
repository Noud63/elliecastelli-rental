import React from 'react'
import Image from 'next/image';
import logo from "@/assets/images/ellielogo3.png"

const Footer = () => {

    const currentYear = new Date().getFullYear()
  return (
    <footer className="relative flex bg-black h-[500px] py-4">
      <div className="container mx-auto flex justify-center md:flex-row items-center px-4">
        <div className="w-22 flex flex-col items-center text-white">
          <Image src={logo} alt="Logo" className="h-20 w-auto" />
          <span className="w-full mt-2 text-2xl font-ChopinScript">Ellie Castelli</span>
        </div>

        <div className="w-full flex justify-center absolute bottom-0 left-0">
          <p className="p-4 text-sm text-gray-400 mt-2 md:mt-0">
            &copy;{currentYear} Ellie Castelli Rental Division. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
