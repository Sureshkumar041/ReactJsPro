import { useLocation } from "react-router-dom";
import NavBar from "../../component/NavBar";
import MenuBar from "../../component/SideBar";
import styles from "./styles.module.scss";
import Footer from "../../component/Footer";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const ckn = "ssds";
  const hideSideBar = ["/"];
  const location = useLocation();
  const showSideBar = !hideSideBar?.includes(location?.pathname);
  const enableShowBar = useSelector(
    (state) => state?.CommonReducer?.isShowSideBar
  );
  return (
    <div className={styles?.container}>
      {showSideBar && <NavBar />}
      {showSideBar && <MenuBar />}
      <div
        className={`${styles?.mainContainer} ${
          showSideBar && styles?.paddingStyle
        } ${showSideBar && !enableShowBar && styles?.marginStyle} ${
          enableShowBar && styles?.noMargin
        }`}
      >
        <main className={styles?.content}>{children}</main>
        {showSideBar && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
