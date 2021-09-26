declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      username: string;
      password: string;
      token: string;
    };
  }
}
