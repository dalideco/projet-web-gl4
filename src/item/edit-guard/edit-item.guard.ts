import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class EditItemGuard implements CanActivate {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //without auto load entities
    const queryRunner = await this.dataSource.createQueryRunner()
    const result = await queryRunner.manager.query(
      `SELECT * FROM item WHERE item.id= $1`, [request.params.id]
    )
    const item = result[0]

    return item.userId===user.id
  }
}
