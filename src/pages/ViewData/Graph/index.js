import { useState } from "react";
import LineGraph from "../../../component/Charts/LineGraph";
import { FormatDate } from "../../../common/constant";

const ExcelGraph = ({ data }) => {
  // const [data, setData] = useState(
  //   Array.from({ length: 15 }, (v, i) => ({
  //     fileid: 36,
  //     id: 42765,
  //     record_date: new Date().setDate(i),
  //     recorded_value: -5.67 + Math.floor(Math.random() * 8),
  //     station_id: null,
  //   }))
  // );
  return (
    <div>
      <LineGraph data={data} />
    </div>
  );
};

export default ExcelGraph;
