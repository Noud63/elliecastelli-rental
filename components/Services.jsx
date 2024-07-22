import React from 'react'
import { CircleCheckBig } from "lucide-react";

const Services = () => {
  return (
    <div className="h-[168px] flex items-center mx-auto max-xl:justify-center max-xl:h-auto max-xl:mt-4 max-xl:mb-8">
      <ul>
        <li className="flex items-center">
          <CircleCheckBig size={18} color="orange" className="mr-2" />
          <span className="text-lg text-white tracking-wide">
            Expat Rental Service
          </span>
        </li>

        <li className="flex items-center">
          {" "}
          <CircleCheckBig size={18} color="orange" className="mr-2" />
          <span className="text-lg text-white tracking-wide">
            Short & Long Stay
          </span>
        </li>

        <li className="flex items-center">
          {" "}
          <CircleCheckBig size={18} color="orange" className="mr-2" />
          <span className="text-lg text-white tracking-wide">
            Knowledgeable Team
          </span>
        </li>

        <li className="flex items-center">
          {" "}
          <CircleCheckBig size={18} color="orange" className="mr-2" />
          <span className="text-lg text-white tracking-wide">
            The Perfect Match
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Services
