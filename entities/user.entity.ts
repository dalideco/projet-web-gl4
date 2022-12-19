import Role from 'models/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  hashed_password: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: Role.user })
  role: Role;

  @OneToMany(() => Item,item => item.user)
  items: Item[];

  @Column({nullable:true})
  image: string;
}
