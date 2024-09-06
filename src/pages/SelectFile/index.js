import { useRef, useState } from "react";
import PButton from "../../component/button";
import styles from "./styles.module.scss";
import UploadedFile from "../../component/UploadedFile";
import { useNavigate } from "react-router-dom";
import { FILESUMMARY_PATH, GROUNDWATERLEVEL_PATH } from "../../common/constant";
import { InsertDataService, UploadExcelService } from "../../services/user";
import { useToastContext } from "../../Utility/ToastUtil";
import ShowToast from "../../component/Toast";
import Loader from "../../component/Loader";
import ExcelSummary from "../../component/ExcelSummary";

const SelectFile = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isExcelSummary, setIsExcelSummary] = useState(false);
  const [fileData, setFileData] = useState({});

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from([event?.dataTransfer?.files?.[0]]);
    const excelFiles = droppedFiles?.filter((file) =>
      file.name.match(/\.(xls|xlsx|csv)$/i)
    );
    setFiles((prevFiles) => [...prevFiles, ...excelFiles]);
  };

  const handleFileSelect = (event) => {
    try {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    } catch (error) {
      console.log("Catch handleFileSelect: ", error?.message);
    }
  };

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleDelete = (delIndex) => {
    const newFile = files?.filter((v, i) => i !== delIndex);
    setFiles(newFile?.length > 0 ? newFile : []);
    // Delete
  };

  const insertData = async () => {
    try {
      setIsLoader(false);
      const payload = {
        filename: fileData?.filename,
        fileid: fileData?.fileid,
        cleandata: 0,
      };
      const res = await InsertDataService(payload);
      if (res?.message === "Data inserted Sucessfully") {
        navigate(GROUNDWATERLEVEL_PATH);
        return true;
      } else {
        ShowToast({
          showToast,
          msg: "Error",
          status: "error",
          details: res?.msg ?? res?.message ?? "Error",
        });
      }
    } catch (error) {
      return false;
    } finally {
      setIsLoader(false);
    }
  };

  const handleNavigateToSummary = (data) => {
    navigate(FILESUMMARY_PATH, { state: data });
  };

  const handleUploadFile = async (formData) => {
    try {
      const res = await UploadExcelService(formData);
      if (res?.status === "success") {
        ShowToast({ showToast, msg: "File Uploaded Successfully" });
        handleNavigateToSummary(res?.data);
        // setFileData(res?.data);
        // handleIsExcelSummary();
      } else {
        ShowToast({
          showToast,
          msg: "Error",
          status: "error",
          details: res?.msg ?? "Error",
        });
        setFileData({});
      }
    } catch (error) {
      setFileData({});
    } finally {
      // setIsLoader(false);
    }
  };

  const uploadFile = async () => {
    try {
      setIsLoader(true);
      await (async () => {
        files?.forEach(async (element) => {
          const formData = new FormData();
          formData?.append("files", element);
          await handleUploadFile(formData);
        });
      })();
    } catch (error) {
    } finally {
      setIsLoader(false);
    }
  };

  const handleIsExcelSummary = () => setIsExcelSummary(!isExcelSummary);

  return (
    <div className={styles?.root}>
      <div className={styles?.uploadContainer}>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={styles?.dragAndDropContainer}
        >
          <h4>UPLOAD FILE</h4>
          <i className="pi pi-cloud-upload"></i>
          <p className="fw-bold">Drag and Drop here</p>
          <p>Or</p>
          <PButton label={"Browse File"} onClick={() => handleButtonClick()} />
          <input
            type="file"
            accept=".xls,.xlsx,.csv"
            // multiple
            ref={fileInputRef}
            onChange={(e) => handleFileSelect(e)}
            style={{ display: "none" }} // Hide the file input
          />
        </div>

        <div
          className="w-100"
          style={{ display: "flex", flexDirection: "column", rowGap: "12px" }}
        >
          {files?.map((file, index) => (
            <UploadedFile
              key={index}
              data={file}
              index={index}
              onDelete={(i) => {
                handleDelete(i);
              }}
            />
          ))}
        </div>
        {files?.length > 0 && (
          <div className="w-100">
            <PButton
              label={"Upload"}
              style={{ width: "100%" }}
              onClick={() =>
                false
                  ? navigate(FILESUMMARY_PATH, {
                      state: {
                        Number_of_Missing_Values: 0,
                        Number_of_Record: 9,
                        enddate: new Date(),
                        startdate: new Date(),
                        station_name: "Sargon_1",
                        filename: "321.xlsx",
                        fileid: 123,
                      },
                    })
                  : uploadFile()
              }
            />
          </div>
        )}
      </div>
      {/* <ExcelSummary
        isVisible={isExcelSummary}
        fileData={fileData}
        onClose={() => {
          handleIsExcelSummary();
        }}
        btnDetails={{
          isVisible: true,
          insert: () => insertData(),
          clean: () => {
            setFileData({});
            handleIsExcelSummary();
          },
        }}
      /> */}
      <Loader isVisible={isLoader} />
    </div>
  );
};

export default SelectFile;
