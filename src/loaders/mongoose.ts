import mongoose from 'mongoose'
import config from 'src/config/index'

async function dbConnect(): Promise<void> {
  const DB_URI = config.databaseURL ?? ''
  await mongoose.connect(DB_URI)
}

export default dbConnect
