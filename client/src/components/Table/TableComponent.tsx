import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import * as React from "react";
import { Student } from "../../lib/entity/student.entity";
import { metaType, pageOptions } from "../../lib/types/page.types";
import UpdateDialog from "../Dialog/UpdateDialog";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 170 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "dob",
    headerName: "Date of birth",
    type: "string",
    width: 130,
    renderCell: (params: any) => {
      //convert to date
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: "actions",
    headerName: "actions",
    width: 150,
    renderCell: (params) => (
      <div className="d-flex gap-3 w-100 justify-content-center">
        <button className="btn btn-light shadow-1 p-1 px-4 rounded-pill">
          <i className="fas fa-pen"></i>
        </button>
      </div>
    ),
  },
];

export default function DataTable({ rows, setPageOptions, pageOptions, meta }: { meta: metaType; rows: Student[]; setPageOptions: (options: pageOptions) => void; pageOptions: pageOptions }) {
  const [data, setData] = React.useState<Student[]>(rows);
  const [dialogData, setDialogData] = React.useState({ open: false, data: {} });

  const handleDialogOpen = (e: GridRowParams<any>) => {
    setDialogData({ open: true, data: e.row });
  };

  const handleDialogClose = () => {
    setDialogData({ open: false, data: {} });
  };

  React.useEffect(() => {
    setData(rows);
  }, [rows]);

  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        rowCount={meta.itemCount}
        pagination
        paginationMode="server"
        pageSize={parseInt(meta.limit.toString())}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPageSizeChange={(e) => {
          setPageOptions({ ...pageOptions, limit: e });
        }}
        onPageChange={(e) => {
          setPageOptions({ ...pageOptions, page: e });
        }}
        onRowClick={(e) => {
          handleDialogOpen(e);
        }}
      />
      {dialogData.open && <UpdateDialog data={dialogData.data} open={dialogData.open} handleClose={handleDialogClose} />}
    </div>
  );
}
