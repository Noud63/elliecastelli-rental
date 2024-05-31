import Image from "next/image"
import { Gallery, Item } from "react-photoswipe-gallery"

const PropertyImages = ({images}) => {
  return (
    <Gallery>
      <section className="bg-blue-50 pb-20">
        <div className="container mx-auto px-6">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={image}
                  alt=""
                  className="object.cover w-full h-[400px] mx-auto rounded-xl cursor-pointer"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        className="object.cover w-full h-[400px] mx-auto rounded-xl cursor-pointer"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}

export default PropertyImages
