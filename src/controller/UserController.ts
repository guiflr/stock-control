import { Request, Response } from "express";

import { UserRepository } from "../repositories/user/UserRepository";

import { LoginUser } from "../services/user/LoginUser";
import { CreateUserService } from "../services/user/CreateUserService";

const userRepository = new UserRepository();

class UserController {
  async find(request: Request, response: Response) {
    const { username, password } = request.body;

    const loginUser = new LoginUser(userRepository);

    const user = await loginUser.execute({ username, password });

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const { username, password, admin } = request.body;

    const createUserService = new CreateUserService(userRepository);

    const user = await createUserService.execute({ username, password, admin });

    return response.json(user);
  }
}

export { UserController };
