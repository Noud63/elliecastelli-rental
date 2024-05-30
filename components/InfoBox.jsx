import React from 'react'

const InfoBox = ({heading, backgroundColor="bg-gray-100", textColor='text-gray-800', buttonInfo, children }) => {
  return (
    <div
      className={`${backgroundColor} p-6 rounded-lg shadow-[0px_2px_4px_rgba(23,37,84,.4)]`}
    >
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} ${buttonInfo.border} ${buttonInfo.color} rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
}

export default InfoBox
