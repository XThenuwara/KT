import { Module } from '@nestjs/common';
import { FilehandleService } from './filehandle.service';
import { FilehandleController } from './filehandle.controller';
import { BullModule } from '@nestjs/bull';
import { FilehandleConsumer } from './filehandle.consumer';
import { NotificationModule } from '../notification/notification.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'filehandle',
    }),
    MulterModule.register({
      dest: './upload',
    }),
    NotificationModule,
    TypeOrmModule.forFeature([Student]),
  ],
  controllers: [FilehandleController],
  providers: [FilehandleService, FilehandleConsumer],
})
export class FilehandleModule {}
