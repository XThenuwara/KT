import { Student } from "../entity/student.entity";

export type StudentDialogType = {
  open: boolean;
  data: Student;
};
