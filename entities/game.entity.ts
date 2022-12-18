import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

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
}
