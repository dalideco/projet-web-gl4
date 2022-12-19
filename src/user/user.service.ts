import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async addOne(email: string, hashed_password: string): Promise<User> {
    console.log(email, hashed_password);
    const entity = this.usersRepository.create({
      email,
      hashed_password,
    });
    this.usersRepository.save([entity]);
    return entity;
  }

  async insertOne(user: Partial<User>){
    const entity = this.usersRepository.create({
      ...user
    });
    this.usersRepository.save([entity]);
    return entity;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addImage(user:any , image: Express.Multer.File){
    const foundUser = await this.findOne(user.id)
    foundUser.image = image.filename
    const toReturnUser = await this.usersRepository.save(foundUser)
    delete toReturnUser.hashed_password
    return toReturnUser
  }

  async empty() {
    const number = await this.usersRepository.count();
    return number === 0;
  }
}
