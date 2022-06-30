import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmDialog(props: any) {
  const { open, handleClose, title, content, handleConfirm } = props;
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <code className="fw-bold">{content}</code>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-light rounded-pill shadow-0" onClick={handleClose}>
            cancel
          </button>
          <button className="btn btn-danger rounded-pill shadow-0" onClick={handleConfirm} autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
