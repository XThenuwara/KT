import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ConfirmDialog from "./ConfirmDialog";
import { deleteStudent, updateStudent } from "../../Repository/student.api";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateDialog({ data, open, handleClose }: { data: any; open: boolean; handleClose: () => void }) {
  const [details, setDetails] = React.useState(data);
  const [errors, setErrors] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [dialogData, setDialogData] = React.useState({
    open: false,
    title: "Confirm",
    content: "Are you sure you want to delete this student?",
    handleConfirm: () => {
      handleDelete();
    },
    handleClose: () => {
      closeDialog();
    },
  });

  const handleRequest = () => {
    setDialogData({ ...dialogData, open: true });
  };

  const closeDialog = () => {
    setDialogData({ ...dialogData, open: false });
  };

  const handleDelete = async () => {
    try {
      const response: any = await deleteStudent(details.id);
      if (response.affected === 1) {
        enqueueSnackbar("Student deleted successfully", { variant: "success" });
        handleClose();
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (e: any) {
      console.log(e);
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const response: any = await updateStudent(details);

      if (response.affected) {
        handleClose();
        enqueueSnackbar("Student Updated Successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (e: any) {
      console.log(e);
      if (e.response.data) {
        setErrors(e.response.data.message);
      }
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted maxWidth="lg" onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          <div>
            <code className="fw-bold text-muted">
              Student Id : <span className="text-dark">{details.id}</span>{" "}
            </code>
            <div className="d-flex flex-column">
              {errors.length > 0 &&
                errors.map((err) => {
                  return <code className="fw-bold">{err}</code>;
                })}
            </div>
            <TextField
              size="small"
              label="Name"
              name="name"
              required
              inputMode="text"
              variant="standard"
              value={details.name}
              className="w-100 border-0 mb-4 mt-2"
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
              className="w-100 border-0 mb-4"
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={details.dob}
                onChange={(newValue) => {
                  setDetails({ ...details, dob: newValue });
                }}
                openTo="year"
                views={["year", "month", "day"]}
                label="Date of Birth"
                className="mb-0"
                renderInput={(params) => <TextField variant="standard" name="dob" className="w-100" size="small" {...params} helperText={null} />}
              />
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions className="d-flex flex-wrap gap-2">
          <button className="btn btn-danger shadow-0 btn-rounded" onClick={() => handleRequest()}>
            Delete
          </button>
          <button className="btn btn-light shadow-0 btn-rounded" onClick={handleClose}>
            Close
          </button>
          <button name="submit" className="btn btn-dark shadow-0 btn-rounded" type="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </DialogActions>
      </Dialog>

      {dialogData?.open && <ConfirmDialog {...dialogData} />}
    </div>
  );
}
