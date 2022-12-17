import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'entities/item.entity';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    // private storeRepository: Repository<Store>,
    private storeService: StoreService,
    private userService: UserService,
  ) {}

  async create(createItemDto: CreateItemDto) {
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

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update({ id }, updateItemDto);
  }

  remove(id: number) {
    return this.itemRepository.softDelete({ id });
  }
}
