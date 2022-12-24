import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ItemService } from '../item.service';

@Injectable()
export class EditItemGuard implements CanActivate {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private itemService: ItemService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const item = await this.itemService.findOne(request.params.id);
    if (!item) throw new NotFoundException(`item ${request.params.id} not found`);
    return item.user.id === user.id;
  }
}
