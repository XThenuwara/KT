import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { toNumber } from '../../lib/validation';

export class PageQueryDto {
  @Transform(({ value }) => toNumber(value, { default: 100, min: 1 }))
  @IsNumber()
  limit = 100;

  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsNumber()
  page = 0;

  @IsString()
  order: 'ASC' | 'DESC' = 'ASC';
}
