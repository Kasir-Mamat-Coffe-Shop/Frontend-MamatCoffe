import { content } from "flowbite-react/tailwind";
import React from "react";

const Card = (props) => {
  const { children, height } = props;
  return (
    <div>
      <div
        className={`h-[${height}] m-4 p-2 text-center bg-gray-100 border border-gray-200 rounded-lg `}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
