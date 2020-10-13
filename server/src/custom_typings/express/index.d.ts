// This way i add the user to the request
declare namespace Express {
  interface Request {
    user: any;
  }
}
