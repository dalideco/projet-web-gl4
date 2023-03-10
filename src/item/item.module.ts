import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'entities/item.entity';
import { StoreModule } from 'src/store/store.module';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [
    UserModule,
    StoreModule,
    GameModule,
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
