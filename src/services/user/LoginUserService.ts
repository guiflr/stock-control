import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

import { User } from "../../models/User";
import { userSchema } from "../../validators/userValidator";
import { UserRepository } from "../../repositories/user/UserRepository";

import { AppError } from "../../errors/AppError";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse{  
  token: string;
}

class LoginUserService {
  constructor(private userRepository: UserRepository) {}
  async execute({ username, password }: IRequest): Promise<IResponse> {
    const data = { username, password };

    try {
      await userSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const user = await this.userRepository.findUserByUsername({ username });

    if (!user) {
      throw new AppError("Invalid username or password", 400);
    }

    const math = await bcrypt.compare(password, user.password);

    if (!math) {
      throw new AppError("Invalid username or password", 400);
    }

    const token = sign({ user }, process.env.AUTH_SECRET, {
      expiresIn: "30d",
    });

    return { token  };    
  }
}

export { LoginUserService };
