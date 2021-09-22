import { User } from "../../models/User";
import { IUser, IUserDTO } from "./IUserRepository";

import UserSchema from "../../database/schemas/UserSchema";

class UserRepository implements IUser {
  async findUserByUsername({ username }: IUserDTO): Promise<User> {
    const user = await UserSchema.findOne({ username });

    return user;
  }

  async create({ username, password, admin = false }: IUserDTO): Promise<User> {
    const data = { username, password, admin };

    const user = await UserSchema.create(data);

    return user;
  }
}

export { UserRepository };
