declare namespace Express {
  type ReqUser = {
    userId: string;
    email: string;
  };
  export interface Request {
    user: ReqUser;
  }
}
