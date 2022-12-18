import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { User } from 'entities/user.entity';
import Role from 'models/role.enum';
import { cryptingConstants } from './auth/constants';
import { UserService } from './user/user.service';

const users:Partial<User>[]=  [
  {
    email: "admin@test.test",
    hashed_password:"admin",
    role: Role.admin
  },
  {
    email:"user@teset.test",
    hashed_password:"user"
  }
]


@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap() {
    if(process.env.ENV !=="local") return;
    
    const usersEmpty = await this.userService.empty()
    if(usersEmpty) {
      Logger.log("seeding users")
      this.seedUsers()
    }
    
  }


  async seedUsers() {
    for(const user of users ){
      user.hashed_password = hashSync(user.hashed_password, cryptingConstants.saltRounds)
      this.userService.insertOne(user)
    }
  }
}
