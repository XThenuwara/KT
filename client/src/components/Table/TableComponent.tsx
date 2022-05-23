import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 150 },
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
  },
  {
    field: "actions",
    headerName: "actions",
    width: 150,
    renderCell: (params) => (
      <div className="d-flex gap-3 w-100 justify-content-between">
        <button className="btn btn-light shadow-1 p-1 px-2 rounded-pill">
          <i className="fas fa-pen"></i>
        </button>
        <button className="btn btn-danger shadow-1 p-1 px-2 rounded-pill">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    ),
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, email: "sas" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 25]}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) => {
            return selectedIDs.has(row.id);
          });
          console.log(selectedRowData);
        }}
        pagination
      />
    </div>
  );
}
