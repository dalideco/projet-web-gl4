import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'entities/game.entity';
import { Item } from 'entities/item.entity';
import { GameService } from 'src/game/game.service';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { SeedCreateItemDto } from './dto/seed-create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    // private storeRepository: Repository<Store>,
    private storeService: StoreService,
    private userService: UserService,
    private gameService: GameService,
  ) {}

  async create(createItemDto: CreateItemDto, logged_user: any) {
    //getting related store and user
    const store = await this.storeService.findOne(createItemDto.storeid);
    const user = await this.userService.findOneByEmail(logged_user.email);

    //getting games
    let games: Game[];
    if (createItemDto.gameIds) {
      games = await this.gameService.findManyIds(createItemDto.gameIds);
    }

    //if store found
    if (user && store) {
      //removing password from user object
      delete user.hashed_password;

      const obj: DeepPartial<Item> = { ...createItemDto, store, user, games };
      const item = await this.itemRepository.create(obj);
      return this.itemRepository.save(item);
    }
    return new NotFoundException(
      `user with id : ${createItemDto.storeid} not found ! `,
    );
  }

  /**for creating seed users */
  async seedCreate(createItemDto: SeedCreateItemDto) {
    const store = await this.storeService.findOne(createItemDto.storeid);
    const user = await this.userService.findOneByEmail(createItemDto.userEmail);
    const games = await this.gameService.findManyIds(createItemDto.gameIds)
    if (store) {
      const obj = { ...createItemDto, store, user, games };
      const item = await this.itemRepository.create(obj);
      return this.itemRepository.save(item);
    }
    return new NotFoundException(
      `user with id : ${createItemDto.storeid} not found ! `,
    );
  }

  findAll() {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update({ id }, { ...updateItemDto });
  }

  remove(id: number) {
    return this.itemRepository.softDelete({ id });
  }

  async empty() {
    const number = await this.itemRepository.count();
    return number === 0;
  }

  async removeGame(id: number, gameId: number) {
    const item = await this.findOne(id);

    if (!item.games.find((game) => game.id === gameId)) {
      throw new   NotFoundException(`game with id ${gameId} not found in item`);
    }

    item.games = item.games.filter((games) => {
      return games.id !== gameId;
    });
    return this.itemRepository.save(item);
  }

  async addGame(id: number, gameId: number) {
    const item = await this.findOne(id);
    const game = await this.gameService.findOne(gameId);
    if (game) {
      item.games.push(game);
      return this.itemRepository.save(item);
    }
  }
}
