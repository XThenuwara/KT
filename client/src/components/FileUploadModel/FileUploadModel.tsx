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
import { useSnackbar } from "notistack";
import { socket } from "../../lib/socket";
import { uploadFile } from "../../Repository/filehandle.api";
import { createStudent } from "../../Repository/student.api";

export default function FileUploadModel() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState([]);
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
    //validate file excel or csv
    if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.type !== "text/csv") {
      return enqueueSnackbar("Please upload a valid file", { variant: "error" });
    }
    //validate file size
    if (file.size > 10000000) {
      enqueueSnackbar("File size should be less than 10MB", { variant: "error" });
      return;
    }
    setFile([file]);
  };

  const removeFile = () => {
    setFile([]);
  };

  const handleUpload = () => {
    try {
      //check file
      if (file.length === 0) {
        return enqueueSnackbar("Please upload a file", { variant: "error" });
      }

      enqueueSnackbar("Uploading : " + file[0].name, { variant: "default" });
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("socketId", socket.id);
      uploadFile(formData);
      setOpen(false);
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const dob = new Date(formData.get("dob") as string);
      formData.set("dob", dob.toISOString());
      await createStudent(formData);
      setErrors([]);
      enqueueSnackbar("Student created successfully", { variant: "success" });
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (e: any) {
      console.log(e);
      const { response } = e;
      if (response && response.data) {
        setErrors(response.data.message);
      }
      enqueueSnackbar("Something Went Wrong. Check Your Form", { variant: "error" });
    }
  };

  return (
    <div>
      <button className="btn btn-dark rounded-pill shadow-5 p-2" onClick={handleClickOpen}>
        <i className="fas fa-plus"></i>
      </button>
      <Dialog open={open} onClose={handleClose} className="h-100">
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent className="w-100 h-100 row m-0 p-0 p-md-2">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
            <code className="text-muted fw-bold mb-2">Upload a Excel File</code>
            {file.length === 1 ? (
              <div className="d-flex">
                <div className="align-items-center bg-light p-2 shadow-1 rounded-5 w-100">
                  <div className="d-flex justify-content-start">
                    <img src={ExcelIcon} alt="" className="img-fluid avatar" />
                  </div>
                  <div className="mt-1 d-flex gap-2 align-items-center justify-content-between">
                    <p className="text-muted m-0" style={{ maxWidth: "23ch" }}>
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
                <label htmlFor="excel" className="align-items-center bg-light p-2 shadow-1 rounded-5 w-100">
                  <div className="d-flex justify-content-start">
                    <img src={UploadIcon} alt="" className="img-fluid avatar" />
                  </div>
                  <div className="my-2">
                    <p className="text-muted m-0" style={{ maxWidth: "23ch" }}>
                      Open File
                    </p>
                  </div>
                  <input id="excel" className="visually-hidden" accept=".xlsx, .csv" type="file" name="excel" onChange={(e) => onFileDrop(e)} />
                </label>
              </div>
            )}
            <div>
              <button className="my-3 btn btn-dark shadow-0 btn-rounded" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="col-12 col-md-6 d-flex flex-column justify-content-between">
            <code className="text-muted fw-bold mb-1">or add a Student</code>
            {errors.length > 0 &&
              errors.map((error: string, index: number) => (
                <code style={{ fontSize: "12px" }} key={index} className="text-danger fw-bold">
                  {error}
                </code>
              ))}
            <div className="d-flex gap-2 bg-light p-2 rounded-5 mt-1">
              <div>
                <TextField
                  size="small"
                  label="Name"
                  name="name"
                  required
                  inputMode="text"
                  variant="standard"
                  value={details.name}
                  className="w-100 border-0 mb-1"
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                />
                <TextField
                  size="small"
                  label="Email"
                  name="email"
                  required
                  inputMode="email"
                  inputProps={{ inputMode: "email", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" }}
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
                    label="Date of Birth"
                    className="mb-0"
                    renderInput={(params) => <TextField variant="standard" name="dob" className="w-100" size="small" {...params} helperText={null} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div>
              <button className="my-3 btn btn-dark shadow-0 btn-rounded">Submit</button>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
