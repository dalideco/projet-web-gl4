import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'entities/game.entity';
import { join } from 'path';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  transformUrl(image: string) {
    return new URL(join(process.env.GAMES_FOLDER, image), process.env.URL).href;
  }

  create(createGameDto: CreateGameDto) {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  findAll() {
    return this.gameRepository.find().then((games) => {
      return games.map((game) => ({
        ...game,
        image: this.transformUrl(game.image),
      }));
    });
  }

  findOne(id: number) {
    return this.gameRepository
      .findOneBy({ id })
      .then((game) => ({ ...game, image: this.transformUrl(game.image) }));
  }

  async findManyIds(ids: number[]) {
    const games: Game[] = [];
    for (const id of ids) {
      games.push(
        await this.findOne(id).then((game) => ({
          ...game,
          image: this.transformUrl(game.image),
        })),
      );
    }
    return games;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.gameRepository.update({ id }, { ...updateGameDto });
  }

  remove(id: number) {
    return this.gameRepository.softDelete(id);
  }

  async empty() {
    const number = await this.gameRepository.count();
    return number === 0;
  }
}
