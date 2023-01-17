import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { Public } from 'decorators/public.decorator';
import { GameService } from 'src/game/game.service';
import { StoreService } from 'src/store/store.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EditItemGuard } from './edit-guard/edit-item.guard';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly gameService: GameService,
    private readonly storeService: StoreService,
  ) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto, @Request() req) {
    return this.itemService.create(createItemDto, req.user);
  }

  // @Roles(Role.admin)
  @Public()
  @Get()
  findAll() {
    return this.itemService.findAll().then((items) =>
      items.map((item) => ({
        ...item,
        games: item.games.map((game) => ({
          ...game,
          image: this.gameService.transformUrl(game.image),
        })),
        store: {
          ...item.store,
          image: this.storeService.transformUrl(item.store.image),
        },
      })),
    );
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id).then((item) => ({
      ...item,
      games: item.games.map((game) => ({
        ...game,
        image: this.gameService.transformUrl(game.image),
      })),
      store: {
        ...item.store,
        image: this.storeService.transformUrl(item.store.image),
      },
    }));
  }

  //TODO: only for a specific user
  @UseGuards(EditItemGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  //TODO: only for the user who created it
  @UseGuards(EditItemGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }

  @UseGuards(EditItemGuard)
  @Patch(':id/delete-game/:gameid')
  removeGame(@Param('id') id: string, @Param('gameid') gameId: string) {
    console.log('removing game', id, gameId);
    return this.itemService.removeGame(+id, +gameId);
  }

  @UseGuards(EditItemGuard)
  @Patch(':id/add-game/:gameid')
  addGame(@Param('id') id: string, @Param('gameid') gameId: string) {
    console.log('adding game', id, gameId);
    return this.itemService.addGame(+id, +gameId);
  }
}
