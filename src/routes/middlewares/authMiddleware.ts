import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";

import { UserRepository } from "../../repositories/user/UserRepository";
import { LoginUserService } from "../../services/user/LoginUserService";

import { AppError } from "../../errors/AppError";

const userRepository = new UserRepository();

export default async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const bearer = request.headers.authorization;

  if (!bearer) {
    throw new AppError("Token not provider", 401);
  }

  console.log(bearer);

  const [_, token] = bearer.split(" ");

  console.log(token);

  if (!token) {
    throw new AppError("Token not provider", 401);
  }

  try {
    const decoded = verify(token, process.env.AUTH_SECRET);
    console.log(decoded);

    next();
  } catch {
    throw new AppError("Isn't valid token", 401);
  }
}
