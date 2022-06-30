import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilehandleModule } from './filehandle/filehandle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: parseInt('3307'),
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      entities: [Student],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDISHOST,
        port: parseInt(process.env.REDISPORT),
      },
    }),

    FilehandleModule,
    ScheduleModule.forRoot(),
    NotificationModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
