import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString({
    message(validationArguments) {
      return `${validationArguments.property}: ${validationArguments.value} is not a string`;
    },
  })
  @IsNotEmpty({})
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dob: Date;

  @IsOptional()
  age: number;
}
