import { Store } from 'entities/store.entity';
import { User } from 'entities/user.entity';
import ItemType from 'models/ItemType.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  price: number;

  @Column()
  description: string;

  @Column({ default: ItemType.account })
  Type: ItemType;

  @ManyToOne(() => Store, store => store.items)
  store: Store;

  @ManyToOne(() => User,user => user.items)
  user: User;
}
