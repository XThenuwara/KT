import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/createStudent.dto';
import { PageMetaDto } from './dto/pageMeta.dto';
import { PageQueryDto } from './dto/pageQuery.dto';
import { PageDto } from './dto/page.dto';
import { SearchMetaDto } from './dto/searchMeta.dto';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    //calculate age
    const { dob } = createStudentDto;
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    createStudentDto.age = age;
    return this.studentRepo.save(createStudentDto);
  }

  async findAll(pageOptions: PageQueryDto) {
    const { page, order, limit } = pageOptions;
    const queryBuilder = this.studentRepo.createQueryBuilder('student');
    const skip = page * limit;
    const take = limit;

    queryBuilder.orderBy('id', order).skip(skip).take(take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptions, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async search(searchQuery: SearchQueryDto) {
    const { page, search_term, limit } = searchQuery;
    const queryBuilder = this.studentRepo.createQueryBuilder('student');
    const skip = page * limit;
    const take = limit;

    queryBuilder
      .where(`name like :name`, { name: `%${search_term}%` })
      .orWhere(`email like :email`, { email: `%${search_term}%` })
      .skip(skip)
      .take(take)
      .getMany();

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new SearchMetaDto({ searchQuery, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  findOne(id: number) {
    return this.studentRepo.findOne(id);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepo.delete(id);
  }
}
