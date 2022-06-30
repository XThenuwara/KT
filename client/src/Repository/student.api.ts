import api from "../lib/axios.config";
import { Student } from "../lib/entity/student.entity";

export const fetchStudent = (page: number, limit: number): Student[] | any => {
  return new Promise((resolve, reject) => {
    const data = {
      page,
      limit,
      order: "ASC",
    };
    api
      .get("/student", { params: data })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const searchStudent = (search_term: string, page: number, limit: number): Student[] | any => {
  return new Promise((resolve, reject) => {
    const data = {
      search_term,
      page,
      limit,
      order: "ASC",
    };
    api
      .get("/student/search", { params: data })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const createStudent = (data: any): Student | any => {
  return new Promise((resolve, reject) => {
    api
      .post("/student", data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const updateStudent = (data: any) => {
  return new Promise((resolve, reject) => {
    api
      .patch(`/student/${data.id}`, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const deleteStudent = (id: number) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/student/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
