import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { User } from "../../models/User";

import { AppError } from "../../errors/AppError";

interface Token {
  user: User;
}

export default async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const bearer = request.headers.authorization;

  if (!bearer) {
    throw new AppError("Token not provider", 401);
  }

  const [_, token] = bearer.split(" ");

  if (!token) {
    throw new AppError("Token not provider", 401);
  }

  try {
    const decodedToken = verify(token, process.env.AUTH_SECRET);

    const { user } = decodedToken as Token;

    request.user = {
      ...user,
    };

    next();
  } catch {
    throw new AppError("Isn't a valid token", 401);
  }
}
