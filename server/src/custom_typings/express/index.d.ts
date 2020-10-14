// This way i add the user to the request
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

// Declare the env variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;

      MONGO_PORT: string;
      MONGO_URI: string;
      MONGO_DB: string;

      JWT_SECRET: string;
      JWT_EXPIRE: string;
      JWT_COOKIE_EXPIRE: string;

      SMTP_HOST: string;
      SMTP_PORT: number;
      SMTP_EMAIL: string;
      SMTP_PASSWORD: string;
      FROM_EMAIL: string;
      FROM_NAME: string;
    }
  }
}

export {};
