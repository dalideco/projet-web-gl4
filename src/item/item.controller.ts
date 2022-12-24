import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Roles } from 'decorators/roles.decoroator';
import Role from 'models/role.enum';
import { Public } from 'decorators/public.decorator';
import { EditItemGuard } from './edit-guard/edit-item.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto, @Request() req) {
    return this.itemService.create(createItemDto, req.user);
  }

  // @Roles(Role.admin)
  @Public()
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
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
  removeGame(@Param('id') id: string , @Param('gameid') gameId: string ){
    console.log("removing game",id, gameId)
    return this.itemService.removeGame(+id,+gameId);
  }

  @UseGuards(EditItemGuard)
  @Patch(':id/add-game/:gameid')
  addGame(@Param('id') id: string , @Param('gameid') gameId: string ){
    console.log("adding game",id, gameId)
    return this.itemService.addGame(+id,+gameId);
  }
}
