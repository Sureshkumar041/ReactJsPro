import { json, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { GetWaterDataService } from "../../services/user";
import CustomFilterDemo from "../PrimeTable/CustomTable/customTable";
import { FormatDate } from "../../common/constant.js";
import PButton from "../button/index.js";
import Loader from "../Loader/index.js";

const Columns = [
  {
    header: (
      <div className={styles?.headerContent}>
        <p>Recorded Value</p>
        <div>
          <i className="pi pi-gauge"></i>
        </div>
      </div>
    ),
    field: "recorded_value",
    sortable: false,
  },
  {
    header: (
      <div className={styles?.headerContent}>
        <p>Recorded Time</p>
        <div>
          <i className="pi pi-history"></i>
        </div>
      </div>
    ),
    field: "record_date",
    sortable: false,
  },
];

const ExcelSummary = ({
  isVisible,
  onClose,
  btnDetails = { isVisible: false },
  fileData,
}) => {
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState(
    []
    // Array.from({ length: 20 }, (v, i) => ({
    //   createddate: FormatDate("Wed, 28 Aug 2024 10:26:12 GMT"),
    //   "filelocation ": "8.xlsx",
    //   id: i + 18,
    //   stationid: null,
    //   username: "skbalahere",
    // }))
  );

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
    if (isVisible && fileData?.fileid) {
      getUploadSummaryData();
    }
  }, [fileData]);

  return (
    <Dialog
      header="Upload Summary"
      visible={isVisible}
      style={{ width: "50%", backgroundColor: "lightblue" }}
      onHide={() => onClose()}
    >
      <div>
        <CustomFilterDemo
          data={data}
          columns={Columns}
          tableDetails={{
            header: {
              isVisible: false,
              className: "excelSummary",
            },
            table: {
              row: {
                noOfRow: data?.length,
              },
            },
            scrollable: true,
            scrollHeight: "50vh",
          }}
        />
      </div>
      {btnDetails?.isVisible && (
        <div className={styles?.btnContainer}>
          <PButton
            label={"Clean"}
            color="secondary"
            onClick={() => btnDetails?.clean && btnDetails?.clean()}
          />
          <PButton
            label={"Insert"}
            onClick={() => btnDetails?.insert && btnDetails?.insert()}
          />
        </div>
      )}
      <Loader isVisible={isLoader} />
    </Dialog>
  );
};

export default ExcelSummary;
