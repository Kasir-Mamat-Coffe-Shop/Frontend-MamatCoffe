import React from "react";

const Pagination = () => {
  return (
      <div className="pt-1">
        <div className="flex gap-2 items-center -space-x-px h-6 text-base">
          <button className="flex items-center justify-center px-1 h-3 text-white bg-gray-300 hover:text-gray-700 border-0 focus:ring-0 rounded-sm">
            <span className="fas fa-plus text-[8px]"></span>
          </button>
          <p className="z-10 flex items-center justify-center px-1 h-6">3</p>
          <button className="flex items-center justify-center px-1 h-3 text-white bg-gray-300 hover:text-gray-700 border-0 focus:ring-0 rounded-sm">
            <span className="fas fa-minus text-[8px]"></span>
          </button>
        </div>
      </div>
  );
};

export default Pagination;
