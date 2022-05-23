import { Optional } from '@nestjs/common';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDate()
  dob: Date;

  @Optional()
  age: number;
}
