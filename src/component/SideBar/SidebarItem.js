import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { setIsShowSideBar } from "../../redux/action/Common";

const SidebarItem = ({ item }) => {
  const location = useLocation();
  const isOpen =
    Array.isArray(item?.childrens) && item?.childrens?.length > 0
      ? item?.childrens?.some((v, i) => v?.path === location?.pathname)
      : false;
  const [open, setOpen] = useState(isOpen);
  const isActive = location?.pathname === item?.path;
  const dispatch = useDispatch();

  const handleSideBar = (path) => {
    console.log("Anchor Tag");
    // dispatch(setIsShowSideBar(false));
  };

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className={`sidebar-title ${isActive ? "active" : ""}`}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            <span className={styles?.pageName}>{item.title}</span>
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <a
        href={item.path || "#"}
        onClick={() => handleSideBar(item.path)}
        className={`sidebar-item plain ${isActive ? "active" : ""}`}
      >
        {item.icon && <i className={item.icon}></i>}
        <span className={styles?.pageName}>{item.title}</span>
      </a>
    );
  }
};

export default SidebarItem;
