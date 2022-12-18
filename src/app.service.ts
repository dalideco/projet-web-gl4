import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { User } from 'entities/user.entity';
import Role from 'models/role.enum';
import { cryptingConstants } from './auth/constants';
import { CreateStoreDto } from './store/dto/create-store.dto';
import { StoreService } from './store/store.service';
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

const stores: CreateStoreDto[] = [
  {
    title: "Steam",
    image: "",
  },
  {
    title: "Epic",
    image: "",
  },
  {
    title: "Origin",
    image: "",
  },
]


@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private userService: UserService,
    private storeService: StoreService) {}

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

    const storesEmpty = await this.storeService.empty();
    if(storesEmpty){
      Logger.log("seeding stores")
      this.seedStores()
    }
    
  }


  async seedUsers() {
    for(const user of users ){
      user.hashed_password = hashSync(user.hashed_password, cryptingConstants.saltRounds)
      this.userService.insertOne(user)
    }
  }

  async seedStores() {
    for(const store of stores) {
      this.storeService.create(store)
    }
  }
}
