import { Entity, Column, PrimaryGeneratedColumn, OneToMany , JoinColumn, ManyToMany} from 'typeorm';



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
