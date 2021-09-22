import { User } from "../../models/User";

interface IUserDTO {
  username: string;
  password?: string;
  admin?: boolean;
}

interface IUser {
  findUserByUsername({ username, password }: IUserDTO): Promise<User>;
  create({ username, password }: IUserDTO): Promise<User>;
}

export { IUserDTO, IUser };
