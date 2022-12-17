import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'entities/user.entity';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    return new Promise<User>(async (resolve) => {
      //getting user
      const user = await this.usersService.findOneByEmail(email);
      //if no user fail
      if (!user) return null;

      //comapare password
      compare(pass, user.hashed_password, (_, same) => {
        //if not same password faile
        if (!same) resolve(null);
        //if same delete hashed password and return user
        else {
          delete user.hashed_password;
          resolve(user);
        }
      });
    });
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async singupUser(email: string, pass: string) {
    return new Promise<User | HttpException>(async (resolve) => {
      //hash password
      hash(pass, 10, async (_, hashed) => {
        //save user
        const user = await this.usersService.addOne(email, hashed);
        if (!user) return resolve(null);
        return resolve(user);
      });
    });
  }

  async verifyEmailExists(email: string) {
    const found = await this.usersService.findOneByEmail(email);

    return found;
  }
}
