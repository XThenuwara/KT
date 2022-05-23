import api from "../lib/axios.config";
import { Student } from "../lib/entity/student.entity";

export const fetchStudent = (): Student[] | any => {
  return new Promise((resolve, reject) => {
    api
      .get("/student")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
