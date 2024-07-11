import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

const InfoBox = async ({heading, backgroundColor="bg-gray-100", textColor='text-gray-800', buttonInfo, children }) => {

const session = await getServerSession(authOptions)

  return (
    <div
      className={`${backgroundColor} p-6 rounded-lg shadow-[0px_2px_4px_rgba(23,37,84,.4)]`}
    >
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={session ? buttonInfo.link : "/signIn"}
        className={`inline-block bg-gradient-to-r from-slate-950  via-[#172f54] to-slate-950 ${buttonInfo.border} ${buttonInfo.color} rounded-lg px-4 py-2`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
}

export default InfoBox
