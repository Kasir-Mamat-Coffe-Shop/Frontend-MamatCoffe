import React from "react";

const CardKategori = (props) => {
  const { children, onClick } = props;
  return (
    <div
      className="h-[90px] w-1/6 m-2 flex flex-col justify-center font-semibold p-2 text-center bg-white border border-gray-200 rounded-sm cursor-pointer"
      onClick={onClick} // Add the onClick handler
    >
      {children}
    </div>
  );
};

export default CardKategori;
