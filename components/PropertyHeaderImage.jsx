import React from 'react'
import Image from 'next/image';

const PropertyHeaderImage = ({image}) => {
  return (
    <section>
      <div className="w-full">
        <div className="max-w-[1350px] mx-auto">
          <Image
            src={image}
            alt=""
            className="object-cover h-[400px] w-full max-w-[1350px] mx-auto"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyHeaderImage
