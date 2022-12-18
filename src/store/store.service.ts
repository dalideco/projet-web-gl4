import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'entities/store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  findAll() {
    return this.storeRepository.find();
  }

  findOne(id: number) {
    return this.storeRepository.findOneBy({ id });
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
