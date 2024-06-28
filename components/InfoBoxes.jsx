import React from 'react'
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="w-full flex justify-center mt-2 px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
          <InfoBox
            heading="For renters"
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
            heading="For property owners"
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
