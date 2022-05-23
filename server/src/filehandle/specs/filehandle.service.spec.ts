import { Test, TestingModule } from '@nestjs/testing';
import { FilehandleService } from '../filehandle.service';

describe('FilehandleService', () => {
  let service: FilehandleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilehandleService],
    }).compile();

    service = module.get<FilehandleService>(FilehandleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
