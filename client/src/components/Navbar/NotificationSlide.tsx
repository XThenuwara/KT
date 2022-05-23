import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/redux.store";
import { useDispatch } from "react-redux";
import { removeAllNotification, removeNotification } from "../../lib/features/notificationSlice";
import { uploadFileRetry } from "../../Repository/filehandle.api";
import { socket } from "../../lib/socket";
import { CSVLink } from "react-csv";

type Anchor = "top" | "left" | "bottom" | "right";

export default function NotificationSlide() {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => {
    return state.notification;
  });

  const handleRemove = (index: number) => {
    dispatch(removeNotification(index));
  };

  const handleRetry = (index: number) => {
    dispatch(removeNotification(index));
    const formData = new FormData();

    //find the matching notification
    const notification = notifications[index];

    formData.append("filePath", notification.data.path);
    formData.append("originalname", notification.data.originalname);
    formData.append("socketId", socket.id);

    uploadFileRetry(formData);
  };

  const handleClearAll = () => {
    dispatch(removeAllNotification());
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 350 }} role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
      <div className="p-3">
        <h4 className="text-muted mt-4 d-flex align-items-cente justify-content-between">
          Notification
          <button className="btn btn-light rounded-pill px-4 shadow-0 me-2  " onClick={toggleDrawer(anchor, true)}>
            <i className="fas fa-bell position-relative">
              <span className="badge bg-danger rounded-pill text-white badge-danger position-absolute px-2" style={{ top: -18 }}>
                {notifications.length}
              </span>
            </i>
          </button>
        </h4>
        <div className="d-flex flex-column gap-3">
          {notifications.length > 0 ? (
            notifications
              .slice(0)
              .reverse()
              .map((notify, index) => {
                switch (notify.variant) {
                  case "error":
                    return (
                      <div key={index} className="d-flex bg-danger-light shadow-1 p-3 rounded-3 justify-content-between">
                        <div>
                          <h6>{notify.message}</h6>
                          <p className="m-0">{notify.data.originalname}</p>
                        </div>
                        <div className="d-flex flex-column justify-content-between gap-2">
                          <button className="btn btn-white shadow-0 px-3 p-1 rounded-pill" onClick={() => handleRemove(index)}>
                            <i className="fas fa-times"></i>
                          </button>
                          <button className="btn btn-danger px-3 p-1 rounded-pill shadow-0" onClick={(e) => handleRetry(index)}>
                            <i className="fas fa-redo"></i>
                          </button>
                        </div>
                      </div>
                    );
                  case "success":
                    return (
                      <div key={index} className="d-flex bg-success-light shadow-1 p-3 rounded-3 justify-content-between">
                        <div>
                          <h6>{notify.message}</h6>
                          <p className="m-0">{notify.data.originalname}</p>
                        </div>
                        <div className="d-flex flex-column justify-content-between gap-2" onClick={() => handleRemove(index)}>
                          <button className="btn btn-white shadow-0 px-3 p-1 rounded-pill">
                            <i className="fas fa-times"></i>
                          </button>
                          <button className="btn btn-success px-3 p-1 rounded-pill">
                            <i className="fas fa-check"></i>
                          </button>
                        </div>
                      </div>
                    );
                  case "warning":
                    //create csvHeaders
                    const csvHeaders = [
                      { label: "name", key: "name" },
                      { label: "email", key: "email" },
                      { label: "dob", key: "dob" },
                    ];
                    return (
                      <div key={index} className="d-flex bg-warning-light shadow-1 p-3 rounded-3 justify-content-between">
                        <div>
                          <h6>{notify.message}</h6>
                          <p className="m-0">{notify.data.originalname}</p>
                        </div>
                        <div className="d-flex flex-column justify-content-between gap-2">
                          <button className="btn btn-white shadow-0 px-3 p-1 rounded-pill" onClick={() => handleRemove(index)}>
                            <i className="fas fa-times"></i>
                          </button>
                          <CSVLink headers={csvHeaders} data={notify.data} filename="failed">
                            <button className="btn btn-warning px-3 p-1 rounded-pill shadow-0">
                              <i className="fas fa-angle-down"></i>
                            </button>
                          </CSVLink>
                        </div>
                      </div>
                    );
                }
              })
          ) : (
            <div className="d-flex shadow-1 p-3 rounded-3 justify-content-between">
              <h6 className="text-dark">No notifications</h6>
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-light shadow-0 rounded-pill px-3 p-1" onClick={() => handleClearAll()}>
              Clear all
            </button>
          </div>
        )}
      </div>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <button className="btn btn-light rounded-pill px-4 shadow-0" onClick={toggleDrawer(anchor, true)}>
            <i className="fas fa-bell position-relative">
              {notifications.length > 0 && (
                <span className="badge bg-danger rounded-pill text-white badge-danger position-absolute px-2" style={{ top: -18 }}>
                  {notifications.length}
                </span>
              )}
            </i>
          </button>
          <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
