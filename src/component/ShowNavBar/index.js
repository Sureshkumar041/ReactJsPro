import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavBar = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/") {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  return (
    // style={{ paddingBottom: showNavBar ? "110px" : "0px" }}
    <div>{showNavBar && children}</div>
  );
};

export default ShowNavBar;
