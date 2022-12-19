import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UserController } from './user.controller';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads');
        },
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileNameParts = file.originalname.split('.');
          const ext = fileNameParts[fileNameParts.length - 1];
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
        },
      }),
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
