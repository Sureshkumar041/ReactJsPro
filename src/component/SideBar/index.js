import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  CLIENT_PATH,
  CLIENTSUPPLIER_PATH,
  DASHBOARD_PATH,
  GROUNDWATERLEVEL_PATH,
  SUPPLIER_PATH,
  UPLOADFILE_PATH,
} from "../../common/constant";
import Button from "../button/index";
import SidebarItem from "./SidebarItem";
import ProfilePng from "../../assets/images/images/profile.jpg";
import { useToastContext } from "../../Utility/ToastUtil";
import { useDispatch, useSelector } from "react-redux";
import ShowToast from "../Toast";
import { useEffect, useState } from "react";
import { setIsShowSideBar } from "../../redux/action/Common";
import { LogoutService } from "../../services/auth";
import Loader from "../Loader";

const MenuBarRoute = [
  {
    title: "Dashboard",
    icon: "pi pi-home",
    path: DASHBOARD_PATH,
  },
  // {
  //   title: "Clients & Suppliers",
  //   icon: "pi pi-building-columns",
  //   path: CLIENTSUPPLIER_PATH,
  //   childrens: [
  //     {
  //       title: "Clients",
  //       icon: "pi pi-angle-double-right",
  //       path: CLIENT_PATH,
  //     },
  //     {
  //       title: "Suppliers",
  //       icon: "pi pi-angle-double-right",
  //       path: SUPPLIER_PATH,
  //     },
  //   ],
  // },
  {
    title: "Ground Water Level",
    icon: "pi pi-clipboard",
    path: GROUNDWATERLEVEL_PATH,
  },
  // {
  //   title: "Water Level Data",
  //   icon: "pi pi-user-edit",
  //   path: "waterLevelData",
  // },
];

const MenuBar = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const dispatch = useDispatch();
  const isShowBar = useSelector((state) => state?.CommonReducer?.isShowSideBar);
  const isBoolean = typeof isShowBar === "boolean";
  const { innerWidth: width } = window;
  const [isAppBar, setIsAppBar] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const getUserDetails = async () => {
    const parseData = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(parseData);
  };

  const hideSideBar = () => {
    dispatch(setIsShowSideBar(false));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (width < 992) {
      setIsAppBar(true);
    } else {
      setIsAppBar(true);
    }
  }, [width]);

  const handleLogout = async () => {
    try {
      setIsLoader(true);
      const res = await LogoutService();
      if (res?.status) {
        ShowToast({ showToast, msg: "Logout Successfully", status: "success" });
        hideSideBar();
        localStorage.clear();
        navigate("/");
      } else {
        ShowToast({
          showToast,
          msg: "Error",
          status: "error",
          details: res?.msg ?? "Error",
        });
      }
    } catch (error) {
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div
      className={`${styles?.sideBar} ${
        isShowBar
          ? styles?.showSideBar
          : isBoolean && !width && styles?.hideSideBar
      }`}
    >
      <div className={styles?.sideBarContainer}>
        <div style={{ padding: "6px 4px" , display:"flex", justifyContent:"center"}}>
         
          <Button
            label={"Add New"}
            className={styles?.addNewBtn}
            onClick={() => {
              navigate(UPLOADFILE_PATH);
              hideSideBar();
            }}
          />
        </div>
        <div className={styles?.sideBarContent}>
          {MenuBarRoute.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
        <div className={styles?.userProfileContainer}>
          <div className={styles?.profileImg}>
            <img className={styles?.img} src={ProfilePng} alt="img" />
          </div>
          <p>
            {userDetails?.username ? userDetails?.username : "kane Williamson"}
          </p>
          <div className={styles?.logoutIcon} onClick={() => handleLogout()}>
            <i className="pi pi-sign-out"></i>
          </div>
        </div>
      </div>
      <Loader isVisible={isLoader} />
    </div>
  );
};
export default MenuBar;
