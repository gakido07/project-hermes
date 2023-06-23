import * as dotenv from 'dotenv';

export const initializeEnvironmentVariables = () => {
  dotenv.config({ path: `../.env.development` });
};
