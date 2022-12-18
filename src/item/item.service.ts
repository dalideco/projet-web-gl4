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
    private gameService: GameService
  ) {}

  async create(createItemDto: CreateItemDto, logged_user: any) {
    //getting related store and user
    const store = await this.storeService.findOne(createItemDto.storeid);
    const user = await this.userService.findOneByEmail(logged_user.email);
    
    //getting games
    let games: Game[];
    if(createItemDto.gameIds){
      games= await this.gameService.findManyIds(createItemDto.gameIds)
    }

    //if store found
    if (user && store) {
      //removing password from user object
      delete user.hashed_password;

      const obj: DeepPartial<Item> = { ...createItemDto, store, user,games };
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
    if (store) {
      const obj = { ...createItemDto, store, user };
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
    let games: Game[]; 
    
    if(updateItemDto.gameIds){
      games = await this.gameService.findManyIds(updateItemDto.gameIds)
    }

    return this.itemRepository.update({ id }, {...updateItemDto, games});
  }

  remove(id: number) {
    return this.itemRepository.softDelete({ id });
  }

  async empty() {
    const number = await this.itemRepository.count();
    return number === 0;
  }
}
