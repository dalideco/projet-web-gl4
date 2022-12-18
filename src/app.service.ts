import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { User } from 'entities/user.entity';
import ItemType from 'models/ItemType.enum';
import Role from 'models/role.enum';
import { cryptingConstants } from './auth/constants';
import { CreateItemDto } from './item/dto/create-item.dto';
import { ItemService } from './item/item.service';
import { CreateStoreDto } from './store/dto/create-store.dto';
import { StoreService } from './store/store.service';
import { UserService } from './user/user.service';

const users: Partial<User>[] = [
  {
    email: 'user@test.test',
    hashed_password: 'user',
  },
  {
    email: 'admin@test.test',
    hashed_password: 'admin',
    role: Role.admin,
  },
];

const stores: CreateStoreDto[] = [
  {
    title: 'Steam',
    image: '',
  },
  {
    title: 'Epic',
    image: '',
  },
  {
    title: 'Origin',
    image: '',
  },
];

const items:CreateItemDto[] = [
  {
    price: 12,
    description: "hello ", 
    storeid: 1, 
    userEmail: "user@test.test",
    type:ItemType.account
  },
  {
    price: 12,
    description: "title clear", 
    storeid: 2, 
    userEmail: "admin@test.test",
    type:ItemType.account
  }
];

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private itemService: ItemService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap() {
    if (process.env.ENV !== 'local') return;

    const usersEmpty = await this.userService.empty();
    if (usersEmpty) {
      Logger.log('seeding users');
      this.seedUsers();
    }

    const storesEmpty = await this.storeService.empty();
    if (storesEmpty) {
      Logger.log('seeding stores');
      this.seedStores();
    }

    const itemsEmpty = await this.itemService.empty()
    if(itemsEmpty) {
      Logger.log("seeding items")
      this.seedItems()
    }
  }

  async seedUsers() {
    for (const user of users) {
      user.hashed_password = hashSync(
        user.hashed_password,
        cryptingConstants.saltRounds,
      );
      this.userService.insertOne(user);
    }
  }

  async seedStores() {
    for (const store of stores) {
      this.storeService.create(store);
    }
  }

  async seedItems() {
    for(const item of items ){
      this.itemService.create(item)
    }
  }
}
