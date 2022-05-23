import { Test, TestingModule } from '@nestjs/testing';
import { FilehandleController } from '../filehandle.controller';
import { FilehandleService } from '../filehandle.service';

describe('FilehandleController', () => {
  let controller: FilehandleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilehandleController],
      providers: [FilehandleService],
    }).compile();

    controller = module.get<FilehandleController>(FilehandleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
