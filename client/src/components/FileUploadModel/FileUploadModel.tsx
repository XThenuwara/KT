import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExcelIcon from "../../assets/icons/sheets.png";
import UploadIcon from "../../assets/icons/upload.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "../../lib/axios.config";
import { useSnackbar } from "notistack";
import { socket } from "../../lib/socket";
import { uploadFile } from "../../Repository/filehandle.api";

export default function FileUploadModel() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File[]>([]);
  const [details, setDetails] = React.useState({
    name: "",
    email: "",
  });

  const [date, setDate] = React.useState<Date | null>(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFileDrop = (event: React.ChangeEvent<HTMLInputElement> | null) => {
    if (event == null) {
      return;
    }

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    console.log(file);
    setFile([file]);
  };

  const removeFile = () => {
    setFile([]);
  };

  const handleUpload = () => {
    try {
      enqueueSnackbar("Uploading : " + file[0].name, { variant: "info" });
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("socketId", socket.id);
      uploadFile(formData);
      setOpen(false);
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <div>
      <button className="btn btn-white rounded-pill shadow-5 p-2" onClick={handleClickOpen}>
        <i className="fas fa-plus"></i>
      </button>
      <Dialog open={open} onClose={handleClose} className="h-100">
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent className="w-100 h-100 d-flex gap-3">
          <div style={{ width: "35ch" }}>
            <code className="text-muted fw-bold mb-2">Upload a Excel File</code>
            {file.length === 1 ? (
              <div className="d-flex">
                <div className="align-items-center bg-light p-2 shadow-1 rounded-5">
                  <div className="d-flex justify-content-start">
                    <img src={ExcelIcon} alt="" className="img-fluid avatar" />
                  </div>
                  <div className="mt-1 d-flex gap-2 align-items-center">
                    <p className="text-muted m-0" style={{ width: "23ch" }}>
                      {file[0].name}
                    </p>
                    <button className="btn btn-danger p-2 px-3  rounded-pill shadow-0" onClick={() => removeFile()}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <label htmlFor="excel" className="align-items-center bg-light p-2 shadow-1 rounded-5">
                  <div className="d-flex justify-content-start">
                    <img src={UploadIcon} alt="" className="img-fluid avatar" />
                  </div>
                  <div className="mt-1">
                    <p className="text-muted" style={{ width: "30ch" }}>
                      Open Files
                    </p>
                  </div>
                  <input id="excel" className="visually-hidden" accept=".xlsx, .csv" type="file" name="excel" onChange={(e) => onFileDrop(e)} />
                </label>
              </div>
            )}
          </div>
          <div style={{ width: "35ch" }}>
            <code className="text-muted fw-bold py-5">or add a Student</code>
            <div className="d-flex gap-2 bg-light p-2 rounded-5">
              <div>
                <TextField
                  size="small"
                  label="Name"
                  name="name"
                  variant="standard"
                  value={details.name}
                  className="w-100 border-0 mb-1"
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                />
                <TextField
                  size="small"
                  label="Email"
                  name="email"
                  variant="standard"
                  value={details.email}
                  className="w-100 border-0 mb-2"
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    openTo="year"
                    views={["year", "month", "day"]}
                    label="Year, month and date"
                    className="mb-0"
                    renderInput={(params) => <TextField variant="standard" className="w-100" size="small" {...params} helperText={null} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
