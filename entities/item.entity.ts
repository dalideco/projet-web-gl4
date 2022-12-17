import { User } from 'entities/user.entity';
import ItemType from 'models/ItemType.enum';
import { Store } from 'entities/store.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
