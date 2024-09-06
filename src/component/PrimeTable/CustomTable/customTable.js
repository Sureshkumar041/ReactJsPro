import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import styles from "./styles.module.scss";
import ExcelSummary from "../../ExcelSummary";
import { useNavigate } from "react-router-dom";
import { VIEWData_PATH } from "../../../common/constant";
import DeletePopup from "../../Popup/DeletePopup";
import { useToastContext } from "../../../Utility/ToastUtil";
import ShowToast from "../../Toast";
import Loader from "../../Loader";
import { DeleteFileService } from "../../../services/user";

// The rule argument should be a string in the format "custom_[field]".
FilterService.register("custom_activity", (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});

const CustomFilterDemo = ({
  data,
  columns = [],
  refresh = { onRefresh: () => {} },
  tableDetails = {
    header: { isVisible: true },
    table: {
      row: {
        noOfRow: 10,
      },
    },
    paginator: {
      isVisible: true,
    },
  },
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    activity: { value: null, matchMode: FilterMatchMode.CUSTOM },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const { showToast } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const showHideItem = columns;
  const [showHideFilter, setShowHideFilter] = useState(
    Array?.isArray(columns) && columns?.length > 0 ? columns : []
  );
  const [selectedRow, setSelectedRow] = useState([]);
  const [rowPerPage, setRowPerPage] = useState([]);
  const [fileData, setFileData] = useState({});
  const [isExcelSummary, setIsExcelSummary] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("");
  const [getCurrentRow, setGetCurrentRow] = useState({});
  var totalRows = data?.length;

  const handleCurrentPopup = (obj = { val: "" }) => {
    setCurrentPopup(obj?.val ? obj?.val : "");
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const payload = { fileid: getCurrentRow?.fileid };
      console.log("payload: ", payload);
      const res = await DeleteFileService(payload);
      if (true || res?.status) {
        ShowToast({ showToast, msg: "Delete successfully" });
        handleCurrentPopup({ val: "" });
        refresh?.onRefresh && refresh?.onRefresh();
      } else {
        ShowToast({ showToast, msg: res?.msg ? res?.msg : "Error" });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowFilter = () => setShowFilter(!showFilter);

  const handleIsExcelSummary = () => setIsExcelSummary(!isExcelSummary);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    const options = [];
    if (totalRows > 5) options.push(5);
    if (totalRows > 10) options.push(10);
    if (totalRows > 20) options.push(20);
    if (totalRows > 50) options.push(50);
    if (totalRows > 100) options.push(100);
    setRowPerPage(options);
  }, [totalRows]);

  const renderHeader = () => {
    return (
      <div className={styles?.headerContainer}>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Global Search"
          />
        </IconField>
        <div className={styles?.filterSection}>
          <i className="pi pi-file-excel"></i>
          <i className="pi pi-sync"></i>
          <i
            className="pi pi-filter-fill"
            onClick={() => handleShowFilter()}
          ></i>
          <MultiSelect
            placeholder="Show / Hide"
            value={showHideFilter}
            onChange={(e) => {
              setShowHideFilter(e?.value);
            }}
            maxSelectedLabels={0}
            options={showHideItem}
            selectedItemsLabel={"Show / Hide"}
            optionLabel="label"
          />
        </div>
      </div>
    );
  };

  const ActionTemplate = ({ colObj }) => {
    return (
      <div className={styles?.actionTemplate}>
        <div
          onClick={() => {
            setGetCurrentRow({ fileid: colObj?.id });
            handleCurrentPopup({ val: "Delete" });
          }}
        >
          <i
            className="pi pi-trash"
            // onClick={() => handleCurrentPopup({ val: "Delete" })}
          ></i>
        </div>
        <div>
          <i className="pi pi-pen-to-square"></i>
        </div>
        <div
          onClick={() =>
            navigate(VIEWData_PATH, { state: { fileid: colObj?.id } })
          }
        >
          <i
            className="pi pi-eye"
            onClick={() => {
              // setFileData({ fileid: colObj?.id });
              // handleIsExcelSummary();
            }}
          ></i>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const RenderColumn = () => {
    return showHideFilter?.map((colObj, i) =>
      colObj?.template === "checkbox" ? (
        <Column key={i} selectionMode={colObj?.selectionMode} />
      ) : colObj?.template === "action" ? (
        <Column
          key={i}
          header={colObj?.header}
          style={{ minWidth: "6rem" }}
          body={(rowData) => <ActionTemplate colObj={rowData} />}
        />
      ) : (
        <Column
          key={i}
          sortable={
            typeof colObj?.sortable === "boolean" ? colObj?.sortable : true
          }
          field={colObj?.field}
          header={colObj?.header}
          filter
          style={{ minWidth: "9rem" }}
        />
      )
    );
  };

  return (
    <div
      className={`${styles?.tableContainer} customTableStyle ${tableDetails?.header?.className}`}
    >
      {true && (
        <DataTable
          value={data}
          rows={
            tableDetails?.table?.row?.noOfRow
              ? tableDetails?.table?.row?.noOfRow
              : 10
          }
          dataKey="id"
          size="small"
          scrollable={tableDetails?.scrollable}
          scrollHeight={tableDetails?.scrollHeight}
          filterDisplay={showFilter ? "row" : ""}
          globalFilterFields={[
            "name",
            "country.name",
            "representative.name",
            "status",
          ]}
          header={tableDetails?.header?.isVisible && header}
          emptyMessage="No record found."
          style={{ height: "100%" }}
          showGridlines={true}
          stripedRows
          rowsPerPageOptions={rowPerPage}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          paginator={tableDetails?.paginator?.isVisible}
          selectionMode={"checkbox"}
          selection={selectedRow}
          onSelectionChange={(e) => {
            setSelectedRow(e?.value);
          }}
        >
          {RenderColumn()}
        </DataTable>
      )}
      <ExcelSummary
        isVisible={isExcelSummary}
        fileData={fileData}
        onClose={() => handleIsExcelSummary()}
      />
      <DeletePopup
        isVisible={currentPopup === "Delete" ? true : false}
        btnDetails={{
          accept: {
            onClick: () => handleDelete(),
          },
          reject: {
            onClick: () => handleCurrentPopup({ val: "" }),
          },
        }}
      />
      <Loader isVisible={isLoading} />
    </div>
  );
};

export default CustomFilterDemo;
