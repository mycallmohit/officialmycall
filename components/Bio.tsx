import * as React from "react";

import Link from "next/link";
import Image from "next/image";

// Using require as normal import causes typescript error
const Fade = require("react-reveal/Fade");
import { data } from "../mock/mock";

const bioImageLoader = (props: any) => {
  return props.src.toString();
};

export const Bio = ({bioData}:{bioData:any}) => {

console.log(bioData?.media?.url)
  return (
    <>
      <section className="py-8 col-span-10 col-start-2 col-end-12 text-center text-gray-600 font-light">
        <Image
          loader={bioImageLoader}
          src={bioData?.media?.url|| "https://res.cloudinary.com/doxkfuxtg/image/upload/v1707411138/Web_2_yme4yu.png"}
          alt="Picture for Bio"
          objectFit="contain"
          width={1200}
          height={600}
        />
        <Fade cascade>
          <h1 className="text-xl my-6 w-full md:w-4/5 text-center mx-auto">
            {bioData?.data?.para1}
          </h1>
          <p className="text-base my-6 w-full md:w-4/5 text-justify mx-auto">
          {bioData?.data?.para2}
          </p>
          <p className="text-base my-6 w-full md:w-4/5 text-justify mx-auto">
          {bioData?.data?.para3}
          </p>
        </Fade>
        <Link href="/contact" passHref>
          <button className="text-gray-100 my-6 bg-gray-600 hover:bg-gray-800 px-8 py-4 focus:outline-none">
            Get in touch
          </button>
        </Link>
      </section>
    </>
  );
};
