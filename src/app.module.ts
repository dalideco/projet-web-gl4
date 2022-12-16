import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import {Item} from 'src/item/entities/item.entity'
import {Store} from 'src/store/entities/store.entity'
import {Game} from 'src/game/entities/game.entity'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { GameModule } from './game/game.module';
import { StoreModule } from './store/store.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      entities: [User,Item],
      synchronize: process.env.ENV === 'local',
    }),
    UserModule,
    AuthModule,
    ItemModule,
    GameModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
