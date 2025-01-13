import React from "react";

const Counter = ({ id, count, onCountChange }) => {
  const increment = () => onCountChange(id, count + 1);
  const decrement = () => {
    if (count > 0) onCountChange(id, count - 1);
  };

  return (
    <div className="pt-1">
      <div className="flex gap-2 items-center -space-x-px h-6 text-base">
        <button
          className="flex items-center justify-center px-1 h-3 text-white bg-gray-300 hover:text-gray-700 border-0 focus:ring-0 rounded-sm"
          onClick={increment}
        >
          <span className="fas fa-plus text-[8px]"></span>
        </button>
        <span className="z-10 flex items-center justify-center px-1 h-6">
          {count}
        </span>
        <button
          className="flex items-center justify-center px-1 h-3 text-white bg-gray-300 hover:text-gray-700 border-0 focus:ring-0 rounded-sm"
          onClick={decrement}
        >
          <span className="fas fa-minus text-[8px]"></span>
        </button>
      </div>
    </div>
  );
};

export default Counter;
