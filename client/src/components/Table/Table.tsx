import React, { useEffect, useState } from "react";
import FileUploadModel from "../FileUploadModel/FileUploadModel";
import EnhancedTable from "./TableComponent";
import { useSnackbar } from "notistack";
import { fetchStudent } from "../../Repository/student.api";
import { Student } from "../../lib/entity/student.entity";

const Table = () => {
  const [data, setData] = useState<Student[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    try {
      fetchData();
    } catch (e: any) {
      console.log(e);
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }, []);

  const fetchData = async () => {
    const response = await fetchStudent();
    console.log(response);
    setData(response);
  };

  return (
    <div className="my-3">
      <div className="d-flex justify-content-end align-items-center gap-2">
        <input type="text" placeholder="Search" className="rounded-pill p-1 px-2 shadow-5 border-0" />
        <button className="btn btn-primary rounded-pill shadow-5 p-2">
          <i className="fas fa-search"></i>
        </button>
        <FileUploadModel />
      </div>
      <div className="p-1 my-3 rounded-2 ">
        <EnhancedTable />
      </div>
    </div>
  );
};

export default Table;
