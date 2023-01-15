import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'entities/store.entity';
import { join } from 'path';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  transformUrl(image) {
    return (new URL(join(process.env.STORES_FOLDER, image), process.env.URL)).href;
  }

  create(createStoreDto: CreateStoreDto) {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  findAll() {
    return this.storeRepository.find().then((stores) =>
      stores.map((store) => ({
        ...store,
        image: this.transformUrl(store.image),
      })),
    );
  }

  findOne(id: number) {
    return this.storeRepository
      .findOneBy({ id })
      .then(store=> ({
        ...store,
        image: this.transformUrl(store.image)
      }))
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return this.storeRepository.update({ id }, updateStoreDto);
  }

  remove(id: number) {
    return this.storeRepository.softDelete(id);
  }

  async empty() {
    const number = await this.storeRepository.count();
    return number === 0;
  }
}
