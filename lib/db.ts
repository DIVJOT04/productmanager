import { MongoClient, Db } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-app'
const DB_NAME = 'fullstack-app'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db(DB_NAME)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getDatabase() {
  const { db } = await connectToDatabase()
  return db
}
