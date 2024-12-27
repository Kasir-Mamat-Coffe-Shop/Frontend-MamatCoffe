import React from "react";

const LeftBar = () => {
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-[10%] h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 items-center justify-center bg-white dark:bg-gray-800 text-left">
          <ul className="py-10 space-y-20 font-semibold text-md">
            <li className="flex flex-col items-center">
              <span className="fas fa-user-circle"></span>
              <span>Profile</span>
            </li>
            <li className="flex flex-col items-center">
              <span className="fas fa-money-bill"></span>
              <span>transaction</span>
            </li>
            <li className="flex flex-col items-center">
              <div>
                <span className="fas fa-pizza-slice"></span>
                <span className="fas fa-coffee"></span>
              </div>
              <span>Manage Product</span>
            </li>
            <li className="flex flex-col items-center">
              <span className="fas fa-user-cog"></span>
              <span>Account</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default LeftBar;
