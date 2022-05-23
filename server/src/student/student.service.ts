import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    //save to db
    return this.studentRepo.save(createStudentDto);
  }

  findAll() {
    return this.studentRepo.find();
  }

  findOne(id: number) {
    return this.studentRepo.findOne(id);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.update(id, updateStudentDto);
  }

  remove(id: number) {
    return 'hello';
  }
}
