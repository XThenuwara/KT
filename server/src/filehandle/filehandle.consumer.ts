import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as xlsx from 'node-xlsx';
import { Repository } from 'typeorm';
import { socketMsgModelWithData } from '../lib/socketMsg.model';
import { isCorrectHeading, isStudentCreate } from '../lib/validation';
import { NotificationService } from '../notification/notification.service';
import { CreateStudentDto } from '../student/dto/createStudent.dto';
import { Student } from '../student/entities/student.entity';

@Processor('filehandle')
export class FilehandleConsumer {
  constructor(
    private readonly notify: NotificationService,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  @Process('upload')
  async fileUpload(job) {
    const { file, socketId } = job.data;
    try {
      const obj = JSON.stringify(
        xlsx.parse(fs.readFileSync(file.path), { cellDates: true }),
      );
      const workbook = JSON.parse(obj);
      const sheet1 = workbook[0].data;
      const titles: string[] = sheet1[0];
      const data = sheet1.slice(1);

      if (!isCorrectHeading(titles)) {
        return this.notify.sendMessage(
          socketId,
          socketMsgModelWithData(
            'Invalid File, Heading should be email, name, dob',
            'error',
            file,
          ),
        );
      }

      //create students
      const failedStudents: any[] = [];
      const students: CreateStudentDto[] = data.map((item) => {
        const student = new CreateStudentDto();
        item.forEach((value, index) => {
          student[titles[index]] = value;
        });
        const dob = new Date(student.dob);
        const age = new Date().getFullYear() - dob.getFullYear();
        student.age = age;
        student.dob = dob;
        if (isStudentCreate(student)) return student;
        failedStudents.push(student);
      });

      //remove undefined

      const newStudents = students.filter((item) => item !== undefined);
      await this.studentRepo.save(newStudents);
      this.notify.sendMessage(
        socketId,
        socketMsgModelWithData('File Uploaded Successfully', 'success', file),
      );

      //send failed students
      if (failedStudents.length > 0) {
        return this.notify.sendMessage(
          socketId,
          socketMsgModelWithData(
            'Failed to create some students',
            'warning',
            failedStudents,
          ),
        );
      }
    } catch (e) {
      console.log(e);
      this.notify.sendMessage(
        socketId,
        socketMsgModelWithData(
          'Something Went Wrong. Please Try Again',
          'error',
          file,
        ),
      );
    }
  }
}
