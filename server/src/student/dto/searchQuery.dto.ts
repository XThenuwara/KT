import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { toNumber } from '../../lib/validation';
import { PageQueryDto } from './pageQuery.dto';

export class SearchQueryDto extends PageQueryDto {
  @ApiProperty({
    description: 'search_term [name, email] for search',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  public search_term!: string;

  @Transform(({ value }) => toNumber(value, { default: 100, min: 1 }))
  @IsNumber()
  limit = 100;

  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsNumber()
  page = 0;
}
