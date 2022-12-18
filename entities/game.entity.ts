import { Column, Entity, PrimaryGeneratedColumn , ManyToMany, JoinTable } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => Item)
    @JoinTable()
    items: Item[]
}
