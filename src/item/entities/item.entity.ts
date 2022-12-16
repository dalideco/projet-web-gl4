import { Entity, Column, PrimaryGeneratedColumn, OneToMany , JoinColumn, OneToOne} from 'typeorm';
import  ItemType  from 'models/ItemType.enum'
import {Store} from 'src/store/entities/store.entity'
import {User} from 'entities/user.entity'

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

  @OneToMany(() => Store, store => Store)
  @JoinColumn()
  storeId: Store;

  @OneToOne(() => User)
  @JoinColumn()
  userEmail: User;
}
