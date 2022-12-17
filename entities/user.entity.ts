import Role from 'models/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
