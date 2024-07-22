import React from 'react'
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section className="w-full">
      <div className="flex justify-center items-center">
        <div className="w-full flex flex-col gap-4 rounded-lg ">
          <InfoBox
            heading="Rent"
            backgroundColor="bg-white"
            buttonInfo={{
              text: "Browse properties",
              link: "/properties",
              backgroundColor: "bg-black",
              color: "text-blue-100",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="Rent Out"
            backgroundColor="bg-blue-200"
            buttonInfo={{
              text: "Add property",
              link: "/properties/add",
              backgroundColor: "",
              border: "bg-black",
              color: "text-blue-100",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes
