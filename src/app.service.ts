import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { items } from 'seeds/items.seeds';
import { stores } from 'seeds/stores.seeds';
import { users } from 'seeds/users.seeds';
import { cryptingConstants } from './auth/constants';
import { GameService } from './game/game.service';
import { ItemService } from './item/item.service';
import { StoreService } from './store/store.service';
import { UserService } from './user/user.service';
import { games } from 'seeds/games.seeds';


@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private itemService: ItemService,
    private gameService: GameService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap() {
    if (process.env.ENV !== 'local') return;

    const usersEmpty = await this.userService.empty();
    if (usersEmpty) {
      Logger.log('seeding users');
      await this.seedUsers();
    }

    const storesEmpty = await this.storeService.empty();
    if (storesEmpty) {
      Logger.log('seeding stores');
      await this.seedStores();
    }

    const gamesEmpty = await this.gameService.empty()
    if(gamesEmpty){
      Logger.log("seeding games")
      await this.seedGames()
    }

    const itemsEmpty = await this.itemService.empty()
    if(itemsEmpty) {
      Logger.log("seeding items")
      await this.seedItems()
    }

    Logger.log("seedings done")
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
      this.itemService.seedCreate(item)
    }
  }

  async seedGames() {
    for(const game of games ){
      this.gameService.create(game)
    }
  }
}
