// import Pool
import { Pool } from 'pg';

// import Environment Variables
import {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} from '../config/db.config';

// initialize Client
let Client: Pool;

if (ENV === 'test') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    port: POSTGRES_PORT as unknown as number,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
} else {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    port: POSTGRES_PORT as unknown as number,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

export default Client;
