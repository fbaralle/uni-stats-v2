import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const getDbNamePrefix = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'dev';
  } else {
    return 'prod';
  }
};

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const getDbClient = async () => {
  if (!uri) {
    throw new Error(
      '[ERROR] Could not find DB client, ENV variables missing { MONGODB_URI }'
    );
  }
  try {
    const dbClient = await new MongoClient(uri, options).connect();
    console.info('DB Connected');
    return dbClient;
  } catch (e) {
    throw new Error('[ERROR] Could not connect to database', e);
  }
};

export const getDb = async (dbName) => {
  const client = await getDbClient();
  const dbNamePrefix = getDbNamePrefix();
  try {
    const db = client.db(dbName ? dbName : `${dbNamePrefix}-db`);
    if (db) {
      return { db, client };
    }
  } catch (e) {}
  throw new Error('[ERROR] No database found!', e);
};

export default getDbClient;
