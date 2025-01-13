import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import coffe from "../../assets/images/coffe.png";

const ProductTransaction = () => {
  return (
    <div>
      <div className="flex w-full">
        <div className="flex-grow mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-center my-4">
            <h2 className="text-2xl font-bold">Mamat Coffee</h2>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex justify-between overflow-y-auto gap-10 my-7 py-5 px-10 bg-white border border-gray-200 rounded-sm shadow-sm h-[83%] min-h-[600px]">
            <div className="w-2/5">
              <Card variant="h-[520px]">
                <div className="flex min-h-[70px] p-2 bg-white rounded-md items-center gap-4 sm:flex-wrap md:flex-nowrap">
                  <img
                    src={coffe}
                    alt="apaweh"
                    className="h-[57px] w-[57px] rounded-md"
                  />
                  <div className="flex justify-between flex-grow text-left">
                    <div className="mb-1 flex flex-col justify-between">
                      <p className="pb-2 text-md ">Coffee Late</p>
                      <div className="pt-1 italic font-normal text-sm ">
                        Rp.50.000/Porsi
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-3/5">
              <Card variant="h-[520px] flex justify-center items-center">
                <h1>Iklan</h1>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTransaction