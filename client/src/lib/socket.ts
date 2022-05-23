import IO from "socket.io-client";
import { baseUrl } from "./axios.config";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { addNotification } from "./features/notificationSlice";
export const socket = IO(baseUrl);

export function SocketIO() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  socket.on("connect", () => {
    console.log("conneted");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("notify", (data) => {
    if (data.data) {
      enqueueSnackbar(data.message + " :" + data.data.originalname, { variant: data.variant });
      dispatch(addNotification(data));
    } else {
      enqueueSnackbar(data.message, { variant: data.variant });
    }
  });
}
