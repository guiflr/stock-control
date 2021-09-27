import { User } from "../../models/User";
import { userSchema } from "../../validators/userValidator";
import { UserRepository } from "../../repositories/user/UserRepository";

import { AppError } from "../../errors/AppError";

interface IRequest {
  username: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ password, username, admin }: IRequest): Promise<User> {
    const data = { password, username, admin };

    const userAlreadyExists = await this.userRepository.findUserByUsername({
      username,
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }

    try {
      await userSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const user = await this.userRepository.create(data);

    return user;
  }
}

export { CreateUserService };
