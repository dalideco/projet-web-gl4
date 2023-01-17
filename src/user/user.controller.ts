import {
  BadRequestException,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  postImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 800000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
    @Request() request,
  ) {
    if (!image) throw new BadRequestException('file missing');
    return this.userService.addImage(request.user, image);
  }
}
