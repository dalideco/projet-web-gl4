import { Injectable , ConflictException, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from 'entities/item.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'entities/store.entity';
import { User } from 'entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private storeRepository: Repository<Store>,
    private userService: UserService,
  
  ) {}

  async create(createItemDto: CreateItemDto) {
    
    const store: Store = await this.storeRepository.findOneBy({id:createItemDto.storeid});
    const user: User = await this.userService.findOneByEmail(createItemDto.userEmail);
    if (store) {
      let obj = { ...createItemDto, store , user};
      const item: Item = await this.itemRepository.create(obj);
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
    return this.itemRepository.findOneBy({id:id});
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return this.itemRepository.softDelete(id);
  }
}
