import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotificationService } from '../notification/notification.service';
import { FilehandleService } from './filehandle.service';

@Controller('filehandle')
export class FilehandleController {
  constructor(
    private readonly filehandleService: FilehandleService,
    private readonly notifyService: NotificationService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() body, @UploadedFile() file: Express.Multer.File) {
    const { socketId } = body;
    return this.filehandleService.upload(file, socketId);
  }

  @Post('uploadretry')
  @UseInterceptors(FileInterceptor('file'))
  async uploadRetry(@Body() body) {
    const { filePath, originalname, socketId } = body;
    const file = {
      path: filePath,
      originalname,
    };
    return this.filehandleService.upload(file, socketId);
  }
}
