import { useEffect, useState } from "react";
import PButton from "../../component/button";
import CustomFilterDemo from "../../component/PrimeTable/CustomTable/customTable";
import styles from "./styles.module.scss";
import { GetFileService } from "../../services/user";
import { FormatDate } from "../../common/constant";
import Loader from "../../component/Loader";

const GroundWaterLevel = () => {
  const groundWaterTableData = [
    {
      header: "Check Box",
      selectionMode: "multiple",
      template: "checkbox",
    },
    {
      header: "File Name",
      field: "filelocation",
    },
    {
      header: "Date",
      field: "createddate",
    },
    {
      header: "Site Name",
      field: "siteName",
    },
    // {
    //   header: "State",
    //   field: "state",
    // },
    // {
    //   header: "District",
    //   field: "district",
    // },
    // {
    //   header: "Tehsil/Block",
    //   field: "block",
    // },
    // {
    //   header: "Village Name",
    //   field: "villageName",
    // },
    // {
    //   header: "Latitude",
    //   field: "latitude",
    // },
    // {
    //   header: "Longitude",
    //   field: "longitude",
    // },
    // {
    //   header: "Well Site",
    //   field: "wellSite",
    // },
    // {
    //   header: "Basin",
    //   field: "basin",
    // },
    // {
    //   header: "Sub Basin",
    //   field: "subBasin",
    // },
    // {
    //   header: "Water Level",
    //   field: "waterLevel",
    // },
    {
      header: "Action",
      field: "action",
      template: "action",
    },
  ];
  const [data, setData] = useState(
    []
    // Array.from({ length: 5 }, (v, i) => ({
    //   state: "Andhra Pradesh",
    //   district: "Anantapur",
    //   block: "Amarapuram",
    //   villageName: "Palasamudram",
    //   siteName: "Dev Tech",
    //   latitude: 345,
    //   longitude: 543,
    //   wellSite: "Dug Well",
    //   basin: "Godavari",
    //   subBasin: "Lower Godavari",
    //   waterLevel: 0.57,
    //   id: 1,
    // }))
  );
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    getFileList();
  }, []);

  const getFileList = async () => {
    try {
      setIsLoader(true);
      const res = await GetFileService();
      const newData = res?.map((obj, i) => {
        return {
          ...obj,
          createddate: FormatDate(obj?.createddate),
          filelocation: obj?.["filelocation "],
        };
      });
      setData(newData);
    } catch (error) {
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className={styles?.root}>
      {false && (
        <div className={styles?.statusContainer}>
          <div className={styles?.cardContainer}>
            <div className={`${styles?.iconContainer} ${styles?.greenBg}`}>
              <i className="pi pi-user"></i>
            </div>
            <div className={styles?.textContainer}>
              <p className={styles?.content}>Total Upload File</p>
              <p className={styles?.countText}>5,423</p>
              <p>
                <span>
                  <i className="pi pi-arrow-up text-success"></i>
                </span>
                <span className="text-success">16%</span>
                <span> this month</span>
              </p>
            </div>
          </div>
          <div className={styles?.dividerSty}></div>
          <div className={styles?.cardContainer}>
            <div className={`${styles?.iconContainer} ${styles?.redBg}`}>
              <i className="pi pi-user"></i>
            </div>
            <div className={styles?.textContainer}>
              <p className={styles?.content}>Total Upload File</p>
              <p className={styles?.countText}>5,423</p>
              <p>
                <span>
                  <i className="pi pi-arrow-down text-danger"></i>
                </span>
                <span className="text-danger">16%</span>
                <span> this month</span>
              </p>
            </div>
          </div>
          <div className={styles?.dividerSty}></div>
          <div className={styles?.cardContainer}>
            <div className={`${styles?.iconContainer} ${styles?.greenBg}`}>
              <i className="pi pi-user"></i>
            </div>
            <div className={styles?.textContainer}>
              <p className={styles?.content}>Total Upload File</p>
              <p className={styles?.countText}>5,423</p>
              <p>
                <span>
                  <i className="pi pi-arrow-up text-success"></i>
                </span>
                <span className="text-success">16%</span>
                <span> this month</span>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className={styles?.pageContainer}>
        <div className="tableTitle">
          <h4>WRIS Groundwater Level Monitor</h4>
        </div>
        <CustomFilterDemo
          data={data}
          columns={groundWaterTableData}
          refresh={{ onRefresh: () => getFileList() }}
        />
        <div className={styles?.btnContainer}>
          <PButton label={"Update All"} color={"success"} />
          <PButton label={"Delete"} color={"danger"} />
        </div>
      </div>
      <Loader isVisible={isLoader} />
    </div>
  );
};

export default GroundWaterLevel;
