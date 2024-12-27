import React, { useState, useEffect } from "react";
import LeftBar from "../../components/LeftBar";
import RightBar from "../../components/RightBar";
const Login = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1024);
    };

    // Check screen size on mount
    handleResize();

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isScreenSmall) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <p className="text-lg font-bold text-red-600">
          Layar kurang besar. Silakan gunakan layar dengan lebar lebih dari
          1000px.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex">
        <LeftBar></LeftBar>
        <div className=" bg-black">haloo</div>
        <RightBar></RightBar>
      </div>
    </div>
  );
};

export default Login;
