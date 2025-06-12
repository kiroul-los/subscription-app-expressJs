import {config} from "dotenv";

// Load environment variables from .env file

const env = process.env.NODE_ENV || 'development';
config({path: `.env.${env}.local`});

// Export the environment variables

export const {  PORT, NODE_ENV, DB_URI, JWT_SECRET,JWT_EXPIRES_IN } = process.env;

