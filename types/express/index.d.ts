export {};

declare global {
  namespace Express {
    export interface Request {
      request_id: string;
      user: User;
    }
  }
}
