import api from "../lib/axios.config";

export const uploadFile = (formData: FormData) => {
  return new Promise((resolve, reject) => {
    api
      .post("/filehandle/upload", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const uploadFileRetry = (formData: FormData) => {
  return new Promise((resolve, reject) => {
    api
      .post("/filehandle/uploadretry", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
