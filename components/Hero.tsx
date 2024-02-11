import * as React from "react";

import Image from "next/image";

// function to get image dimensions for model image
import { uniqueFunction } from "../hooks/uniqueFunction";

// Using require as normal import causes typescript error
const Fade = require("react-reveal/Fade");
import { data } from "../mock/mock";
import YoutubeEmbed from "./YoutubeEmbed";

const modelImageLoader = (props: any) => {
  return props.src.toString();
};

export const Hero = ({userData}: any) => {
  const [imageDimensions, setImageDimensions] = React.useState([0, 0]);
console.log(userData)

  React.useEffect(() => {
    setImageDimensions(uniqueFunction(/* modelImage */) || []); // to get initial image dimensions

    function handleResize(): void {
      setImageDimensions(uniqueFunction(/* modelImage */) || []);
    }
    if (typeof window != "undefined") {
      window.addEventListener("resize", handleResize); // handle resize

      return function cleanupListener() {
        // removing event listener improves efficiency
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [setImageDimensions]);

  return (
    <section className="py-8 col-span-10 col-start-2 col-end-12 grid grid-cols-1 sm:grid-cols-2">
      <Fade left>
        <div className="flex flex-col justify-evenly order-2 md:order-1">
          <h1 className="text-5xl md:text-7xl md:w-min my-4 md:m-0 font-light leading-snug">
            Meet {userData?.petname}
          </h1>
          <h2 className="font-extralight text-2xl my-4 md:m-0 text-gray-700">
            {userData?.profession}
          </h2>
        </div>
      </Fade>
      <Fade>
        <div className="relative grid place-items-center order-1 md:order-2">
          {userData?.media?.type==='image' ? <Image
            loader={modelImageLoader}
            src={userData?.media?.url}
            alt="Picture of artist"
            objectFit="contain"
            priority={true}
            height={imageDimensions[0]}
            width={imageDimensions[0]}
          />: <YoutubeEmbed embedId={userData?.media?.url} />}

        </div>
      </Fade>
    </section>
  );
};
