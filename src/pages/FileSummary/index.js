import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import PButton from "../../component/button";
import { useEffect, useState } from "react";
import { FormatDate, GROUNDWATERLEVEL_PATH } from "../../common/constant";
import SummaryCard from "../../component/SummaryCard";
import { useToastContext } from "../../Utility/ToastUtil";
import ShowToast from "../../component/Toast";
import { InsertDataService } from "../../services/user";
import { Accordion, AccordionTab } from "primereact/accordion";
import Loader from "../../component/Loader";

const FileSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastContext();
  const [data, setData] = useState(location?.state);
  const [fileDetails, setFileDetails] = useState({
    description: {},
    preview: [],
    message: "",
  });
  const [showProgess, setShowProgess] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [insertDataRes, setInsertDataRes] = useState([]);
  const [isInsertSuccess, setIsInsertSuccess] = useState(false); // Track insertion success
  const [fieldData, setFieldData] = useState({
    noOfRecord: {
      label: "Number of records",
      value: location?.state?.Number_of_Records,
      icon: "pi pi-list-check",
      color: "teal",
    },
    noOfMissingValue: {
      label: "Number of missing records",
      value: location?.state?.Number_of_Missing_Values,
      icon: "pi pi-times",
      color: "red",
    },
    filename: {
      label: "File name",
      value: location?.state?.filename,
      icon: "pi pi-file-check",
      color: "green",
    },
    startdate: {
      label: "Start date",
      value: FormatDate(location?.state?.startdate),
      icon: "pi pi-calendar",
      color: "grey",
    },
    enddate: {
      label: "End date",
      value: FormatDate(location?.state?.enddate),
      icon: "pi pi-calendar",
      color: "lightcoral",
    },
    station_name: {
      label: "Station name",
      value: location?.state?.station_name,
      icon: "pi pi-building",
      color: "primary",
    },
  });

  const updateFileDetails = async () => {
    try {
      const des = JSON?.parse(
          location?.state?.Data_Description
            ? location?.state?.Data_Description
            : JSON.stringify({})
        ),
        previewData = JSON?.parse(
          location?.state?.Data_Preview
            ? location?.state?.Data_Preview
            : JSON.stringify([])
        );
      let newDesObj = { description: {}, preview: [] };
      const fieldName = {
        max: {
          label: "Maximum",
        },
        mean: {
          label: "Mean",
        },
        min: {
          label: "Minimum",
        },
      };
      Object?.keys(des)?.map((v, i) => {
        Object?.keys(des?.[v])?.map((keyName, i) => {
          newDesObj = {
            ...newDesObj,
            description: {
              ...newDesObj?.description,
              [keyName]: {
                label: fieldName?.[keyName]?.label,
                value: des?.[v]?.[keyName],
              },
            },
          };
        });
      });
      previewData?.map((previewDataObj, i) => {
        let newObj = {};
        Object?.keys(previewDataObj)?.map((keyName, j) => {
          newObj = {
            ...newObj,
            [j === 0 ? "waterLevel" : "date"]: {
              value: previewDataObj?.[keyName],
              label: j === 0 ? "Water Level" : "Date",
            },
          };
        });
        newDesObj?.preview?.push(newObj);
      });
      setFileDetails(newDesObj);
    } catch (error) {
      console.log(`Catch updateVa: `, error?.message);
    }
  };

  useEffect(() => {
    updateFileDetails();
  }, []);

  const insertData = async (isClean = false) => {
    try {
      setIsLoader(true);
      setShowProgess(true);
      const payload = {
        filename: data?.filename,
        fileid: data?.fileid,
        cleandata: isClean ? 1 : 0,
      };
      const res = await InsertDataService(payload);
      if (res?.message === "Data inserted Sucessfully") {
        const parsedData = JSON.parse(res?.data?.message);
        setInsertDataRes(parsedData?.messages);

        ShowToast({ showToast, msg: "Data inserted Sucessfully" });
        setIsInsertSuccess(true)
        // navigate(GROUNDWATERLEVEL_PATH);
      } else {
        ShowToast({
          showToast,
          msg: "Error",
          status: "error",
          details: res?.msg ?? res?.message ?? "Error",
        });
      }
    } catch (error) {
      console.log("Catch insertData: ", error?.message);
    } finally {
      setIsLoader(false);
      setShowProgess(false);
    }
  };

  const DescriptionKeyPair = ({ data }) => {
    return (
      <div className={styles?.keyPairContainer}>
        <p>{data?.label}</p>
        <p>{data?.value}</p>
      </div>
    );
  };

  return (
    <div className={styles?.root}>
      <div className={styles?.rootContainer}>
        <p className={styles?.heading}>File Summary</p>
        <div className={styles?.cardContainer}>
          <div className={styles?.cards}>
            {Object?.keys(fieldData)?.map((v, i) => (
              <SummaryCard key={i} data={fieldData?.[v]} />
            ))}
          </div>
        </div>
        <div className={styles?.accordionContainer}>
          <Accordion
            multiple
            activeIndex={[0, 1]}
            className={`${styles?.accordion} accordion`}
          >
            <AccordionTab header="Description">
              <div className={styles?.keyPairSection}>
                {Object?.keys(fileDetails?.description)?.map((keyName, i) => (
                  <DescriptionKeyPair
                    key={i}
                    data={fileDetails?.description?.[keyName]}
                  />
                ))}
              </div>
            </AccordionTab>
            <AccordionTab header="Preview">
              <div className={styles?.keyPairPreviewSection}>
                {fileDetails?.preview?.map((previewObj, i) =>
                  Object?.keys(previewObj)?.map((keyName, j) => (
                    <DescriptionKeyPair key={i} data={previewObj?.[keyName]} />
                  ))
                )}
              </div>
            </AccordionTab>
            <AccordionTab header="Message">
              <div>
                {insertDataRes?.map((insertObj, i) => (
                  <div key={i}>
                    <p>{insertObj}</p>
                    <hr className={styles?.horizontalLine} />{" "}
                  </div>
                ))}
              </div>
            </AccordionTab>
          </Accordion>
        </div>
        {/* <div className={styles?.btnContainer}>
          <PButton
            label={"Insert Data"}
            color="success"
            onClick={() => insertData()}
            // icon={!cleandata ? "pi pi-times" : "pi pi-check"}
            iconPos="right"
            loading={isLoader}
          />
          <PButton
            label={"Clean & Insert Data"}
            onClick={() => {
              insertData(true);
            }}
            loading={isLoader}
          />
        </div> */}
          <div className={styles?.btnContainer}>
          {isInsertSuccess ? (
            <PButton
              label={"Back to List"}
              onClick={() => navigate(GROUNDWATERLEVEL_PATH)}
              loading={isLoader}
            />
          ) : (
            <>
              <PButton
                label={"Insert Data"}
                color="success"
                onClick={() => insertData()}
                iconPos="right"
                loading={isLoader}
              />
              <PButton
                label={"Clean & Insert Data"}
                onClick={() => {
                  insertData(true);
                }}
                loading={isLoader}
              />
            </>
          )}
        </div>
      </div>
      <Loader isVisible={showProgess} />
    </div>
  );
};

export default FileSummary;
