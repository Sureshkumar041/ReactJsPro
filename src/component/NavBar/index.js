import styles from "./styles.module.scss";
import AppLogo from "../../assets/images/icon/logo.png";
import { Link, useNavigate } from "react-router-dom";
import ProfilePng from "../../assets/images/images/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowSideBar } from "../../redux/action/Common";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { UPLOADFILE_PATH } from "../../common/constant";

const NavBar = () => {
  const isShowSideBar = useSelector(
    (state) => state?.CommonReducer?.isShowSideBar
  );
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const menuOptions = [{ label: "" }];

  const handleSideBar = () => {
    dispatch(setIsShowSideBar(!isShowSideBar));
  };

  const handleUpload = () => {
    dispatch(setIsShowSideBar(false));
    navigate(UPLOADFILE_PATH);
  };

  return (
    <header className={styles?.navbar}>
      <nav>
        <div className={styles?.navbarContainer}>
          <div className={styles?.appLogoContainer}>
            <div className={styles?.appLogo}>
              <img
                src={AppLogo}
                alt="logo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div
            className={styles?.appBarContainer}
            onClick={() => {
              handleSideBar();
            }}
          >
            <i className="pi pi-bars"></i>
          </div>
          <div className={styles?.iconSection}>
            <div className={styles?.iconContainer}>
              <div onClick={() => handleUpload()}>
                <i className="pi pi-cloud-upload"></i>
              </div>
              <div>
                <i className="pi pi-bell"></i>
              </div>
              <div>
                <i className="pi pi-cog"></i>
              </div>
              <div>
                <div
                  style={{
                    borderRadius: "25px",
                    width: "45px",
                    height: "45px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <i className="pi pi-user" style={{ color: "green" }}></i> */}
                  <img
                    alt="img"
                    src={ProfilePng}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50px",
                      border: "1px solid lightgrey",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles?.menuBarContainer}>
              <i
                className="pi pi-ellipsis-v"
                onClick={(e) => menuRef?.current?.toggle(e)}
                aria-controls="popup_menu_right"
                aria-haspopup
              ></i>
            </div>
          </div>
        </div>
      </nav>
      <div className={styles?.navbarBottom}></div>
      <Menu
        className="mobileMenuBar"
        model={[
          { label: "Profile", icon: "pi pi-user" },
          {
            label: "Upload",
            icon: "pi pi-cloud-upload",
            command: () => handleUpload(),
          },
          { label: "Notification", icon: "pi pi-bell" },
          { label: "Setting", icon: "pi pi-cog" },
        ]}
        ref={menuRef}
        popup
        id="popup_menu_right"
        popupAlignment="right"
      />
    </header>
  );
};

export default NavBar;
