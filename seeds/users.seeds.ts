import { User } from "entities/user.entity";
import Role from "models/role.enum";

export const users: Partial<User>[] = [
    {
      email: 'user@test.test',
      hashed_password: 'user',
    },
    {
      email: 'admin@test.test',
      hashed_password: 'admin',
      role: Role.admin,
    },
  ];