import { User } from 'entities/user.entity';
import ItemType from 'models/ItemType.enum';
import { Store } from 'src/store/entities/store.entity';
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

  @OneToOne(() => User)
  @JoinColumn()
  userEmail: User;
}
