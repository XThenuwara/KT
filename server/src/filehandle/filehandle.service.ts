import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FilehandleService {
  constructor(@InjectQueue('filehandle') private readonly fileQueue: Queue) {}

  async upload(file, socketId) {
    const data = {
      file,
      socketId,
    };
    return this.fileQueue.add('upload', data);
  }

  async uploadRetry(file, socketId) {
    const data = {
      file,
      socketId,
    };
    return this.fileQueue.add('upload', data);
  }
}
