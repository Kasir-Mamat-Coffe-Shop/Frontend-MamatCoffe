import React from "react";

const CardProduct = (props) => {
  const { children } = props;
  return (
    <div className="h-[130px] w-[22%] m-2 flex flex-col font-semibold p-2 text-center bg-white border border-gray-200 rounded-sm">
      {children}
    </div>
  );
};

export default CardProduct;
