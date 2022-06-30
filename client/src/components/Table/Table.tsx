import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Student } from "../../lib/entity/student.entity";
import { metaType, pageOptions } from "../../lib/types/page.types";
import { fetchStudent, searchStudent } from "../../Repository/student.api";
import FileUploadModel from "../FileUploadModel/FileUploadModel";
import EnhancedTable from "./TableComponent";

const Table = () => {
  const [pageOptions, setPageOptions] = useState<pageOptions>({ limit: 100, page: 0 });
  const [data, setData] = useState<Student[]>([]);
  const [meta, setMeta] = useState<metaType>({ page: 0, limit: 100 });
  const [search, setSearch] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    try {
      if (search.length > 0) {
        searchExecute();
      } else fetchData();
    } catch (e: any) {
      console.log(e);
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }, [pageOptions]);

  const fetchData = async () => {
    const response = await fetchStudent(pageOptions.page, pageOptions.limit);
    setData(response.data);
    setMeta(response.meta);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchExecute();
  };

  const searchExecute = async () => {
    const response = await searchStudent(search, pageOptions.page, pageOptions.limit);
    setData(response.data);
    setMeta(response.meta);
  };

  const handleReset = () => {
    setSearch("");
    fetchData();
  };

  return (
    <div className="my-3">
      <div className="d-flex justify-content-end align-items-center gap-2">
        <form onSubmit={(e) => handleSearch(e)} className="d-flex gap-2">
          <input type="text" placeholder="Search" name="search" onChange={(e) => setSearch(e.target.value)} required min={2} max={20} className="rounded-pill p-1 px-2 shadow-5 border-0" />
        </form>
        <button className="btn btn-light rounded-pill shadow-5 p-2" onClick={() => handleReset()}>
          <i className="fas fa-redo"></i>
        </button>
        <FileUploadModel />
      </div>
      <div className="p-1 my-3 rounded-2 ">{data && <EnhancedTable meta={meta} rows={data} setPageOptions={setPageOptions} pageOptions={pageOptions} />}</div>
    </div>
  );
};

export default Table;
