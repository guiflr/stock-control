import { User } from "../../models/User";
import { userSchema } from "../../validators/userValidator";
import { UserRepository } from "../../repositories/user/UserRepository";

import { AppError } from "../../errors/AppError";

interface IRequest {
  username: string;
  password: string;
}

class LoginUser {
  constructor(private userRepository: UserRepository) {}
  async execute({ username, password }: IRequest): Promise<User> {
    const data = { username, password };

    try {
      await userSchema.validate(data);
    } catch (err) {     
      throw new AppError(err.message, 400);
    }

    const user = this.userRepository.findUser({ ...data });

    if (!user) {
      throw new AppError("Username os password not found", 400);
    }

    return user;
  }
}

export { LoginUser };
