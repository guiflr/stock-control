import { User } from "../../models/User";
import { IUser, IUserDTO } from "./IUserRepository";

import UserSchema from "../../database/schemas/UserSchema";

class UserRepository implements IUser {
  async findUser({ username, password }: IUserDTO): Promise<User> {
    const user = new User();

    const data = { username, password };

    Object.assign(user, data);

    return user;
  }

  async create({ username, password, admin = false }: IUserDTO): Promise<User> {
    const data = { username, password, admin };

    const user = await UserSchema.create(data);   

    return user;
  }
}

export { UserRepository };
