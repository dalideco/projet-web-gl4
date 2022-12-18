import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Roles } from 'decorators/roles.decoroator';
import Role from 'models/role.enum';
import { Public } from 'decorators/public.decorator';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto, @Request() req) {
    return this.itemService.create(createItemDto, req.user);
  }

  @Roles(Role.admin)
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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  //TODO: only for the user who created it
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
