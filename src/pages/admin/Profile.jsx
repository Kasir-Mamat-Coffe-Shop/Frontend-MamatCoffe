import React from "react";
import profile from "../../assets/images/profile.png"
import LeftBar from "../../components/LeftBar";
const Profile = () => {
  return (
    <div>
      <div className="flex w-full">
        <LeftBar></LeftBar>
        <div className="flex-grow mx-6 md:min-w-[500px] xl:w-full">
          <div className="flex justify-between my-4">
            <h2 className="text-2xl font-bold">Profile Pegawai</h2>
            <h2 className="text-xl font-normal">Mamat Saepuloh</h2>
          </div>
          <hr className="h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <div className="flex overflow-y-auto gap-1 my-7 py-14 px-10 justify-between bg-white border border-gray-200 rounded-sm shadow-sm h-[85%]">
            <div className="w-2/3 flex flex-col pl-8 gap-4 font-semibold text-gray-500">
              <div className="flex gap-10">
                <div className="text-left flex flex-col w-1/2 gap-2">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="rounded-[4px] border-gray-400 "
                  />
                </div>
                <div className="text-left flex flex-col w-1/2 gap-2">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="rounded-[4px] border-gray-400 "
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-left flex flex-col gap-3">
                  <label>Brith Day</label>
                  <input
                    type="date"
                    placeholder="Brith Day"
                    className="rounded-[4px] border-gray-400 "
                  />
                </div>
                <div className="text-left flex flex-col gap-3">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Addres"
                    className="rounded-[4px] border-gray-400 "
                  />
                </div>
                <div className="text-left flex flex-col gap-3">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="rounded-[4px] border-gray-400 "
                  />
                </div>
                <div className="text-left flex flex-col gap-3">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="rounded-[4px] border-gray-400 "
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/3 px-6 items-center gap-4">
              <h2 className="text-left w-5/6 text-xl font-semibold text-gray-500">
                Profile Picture
              </h2>
              <img
                src={profile}
                alt=""
                className="h-5/6 w-5/6 ring-2 ring-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
