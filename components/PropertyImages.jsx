import Image from "next/image"
import { Gallery, Item } from "react-photoswipe-gallery"

const PropertyImages = ({images}) => {

  const options = {
    arrowPrev: true,
    arrowNext: true,
    zoom: true,
    close: true,
    counter: true,
    bgOpacity: 0.8,
    padding: { top: 20, bottom: 40, left: 50, right: 50 },
  };

  console.log(images);

  return (
    <Gallery options={options}>
      <section className="pb-20 flex justify-center mx-6">
        <div className="w-full max-w-[1350px] bg-blue-50 rounded-lg p-4">
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
                  src={images[0]}
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
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${images.length === 3 && index === 2 ? "" : ""}`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                    caption="Foo"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        className="object-cover w-full h-[400px] mx-auto rounded-lg cursor-pointer "
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
