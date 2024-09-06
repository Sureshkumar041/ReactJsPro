import { useEffect, useState } from "react";
import ExcelGraph from "./Graph";
import ExcelList from "./List";
import styles from "./styles.module.scss";
import { TabView, TabPanel } from "primereact/tabview";
import { GetWaterDataService } from "../../services/user";
import { FormatDate } from "../../common/constant";
import { useLocation } from "react-router-dom";
import Loader from "../../component/Loader";

const ViewExcelInfo = () => {
  const location = useLocation();
  const fileData = location?.state;
  const [data, setData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const getUploadSummaryData = async () => {
    try {
      setIsLoader(true);
      const payload = { fileid: fileData?.fileid };
      const res = await GetWaterDataService(payload);
      const parseData =
        typeof res === "string"
          ? JSON.parse(res?.replace(/NaN/g, "null"))
          : res;
      // JSON.parse(res?.replace(/NaN/g, "null"))
      if (
        parseData?.status &&
        Array.isArray(parseData?.data) &&
        parseData?.data?.length > 0
      ) {
        const newData = parseData?.data?.map((v, i) => {
          return {
            ...v,
            record_date: FormatDate(v?.record_date),
          };
        });
        setData(newData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Catch getUploadSummaryData: ", error?.message);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (fileData?.fileid) {
      getUploadSummaryData();
    }
  }, []);

  const HeaderTemplate = (options) => {
    const objDetails = {
      0: { icon: "pi pi-list" },
      1: { icon: "pi pi-chart-line" },
    };
    return (
      <div
        onClick={options.onClick}
        className={`${options.className} ${styles?.tabHeader}`}
      >
        <div className={styles?.headerIcon}>
          <i className={objDetails?.[options?.index]?.icon}></i>
        </div>
        <p>{options?.titleElement}</p>
      </div>
    );
  };

  return (
    <div className={styles?.root}>
      <div className="my-3">
        <p className="pageTitle">Excel Information</p>
      </div>
      <TabView>
        <TabPanel header="List" headerTemplate={HeaderTemplate}>
          <ExcelList data={data} />
        </TabPanel>
        <TabPanel header="Graph" headerTemplate={HeaderTemplate}>
          <ExcelGraph data={data} />
        </TabPanel>
      </TabView>
      <Loader isVisible={isLoader}/>
    </div>
  );
};

export default ViewExcelInfo;
