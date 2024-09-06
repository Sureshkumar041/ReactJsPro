import { useState } from "react";
import CustomFilterDemo from "../../../component/PrimeTable/CustomTable/customTable";
import styles from "./styles.module.scss";
import { FormatDate } from "../../../common/constant";

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
    label: "Recorded Value",
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
    label: "Recorded Time",
    field: "record_date",
    sortable: false,
  },
];

const ExcelList = ({ data }) => {
  // const [data, setData] = useState(
  //   Array.from({ length: 15 }, (v, i) => ({
  //     fileid: 36,
  //     id: 42765,
  //     record_date: FormatDate(new Date()),
  //     recorded_value: "-5.67",
  //     station_id: null,
  //   }))
  // );
  return (
    <div>
      <div>
        <CustomFilterDemo
          data={data}
          columns={Columns}
          tableDetails={{
            header: {
              isVisible: false,
              className: "excelSummary",
            },
            paginator: {
              isVisible: true,
            },
            // scrollable: true,
            // scrollHeight: "50vh",
          }}
        />
      </div>
    </div>
  );
};

export default ExcelList;
