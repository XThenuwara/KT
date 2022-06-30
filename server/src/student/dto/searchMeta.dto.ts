import { ApiProperty } from '@nestjs/swagger';
import { SearchQueryDto } from './searchQuery.dto';

interface PageMetaDtoParameters {
  searchQuery: SearchQueryDto;
  itemCount: number;
}

export class SearchMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ searchQuery, itemCount }: PageMetaDtoParameters) {
    this.page = searchQuery.page;
    this.limit = searchQuery.limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
