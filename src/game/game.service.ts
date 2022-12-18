import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'entities/game.entity';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  create(createGameDto: CreateGameDto) {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  findAll() {
    return this.gameRepository.find();
  }

  findOne(id: number) {
    return this.gameRepository.findOneBy({ id });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.gameRepository.update({ id }, { ...updateGameDto });
  }

  remove(id: number) {
    return this.gameRepository.softDelete(id);
  }

  async empty() {
    const number = await this.gameRepository.count()
    return number ===0 
  }
}
