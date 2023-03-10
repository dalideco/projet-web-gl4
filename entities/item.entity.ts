import { Store } from 'entities/store.entity';
import { User } from 'entities/user.entity';
import ItemType from 'models/ItemType.enum';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;
  
  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ default: ItemType.account })
  type: ItemType;

  @ManyToOne(() => Store, store => store.items,{eager:true})
  store: Store;

  @ManyToOne(() => User,user => user.items,{eager: true})
  user: User;

  @ManyToMany(() => Game,{eager: true})
  @JoinTable()
  games: Game[];
}
