import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}


const cache = cached as { conn: any; promise: any };

export async function connectToDatabase() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const uri = process.env.MONGODB_URI!;
    
    // Validate environment variables
    if (!uri) {
      throw new Error('Please define MONGODB_URI environment variable');
    }

    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ssl: true,
      retryWrites: true,
      w: 'majority'
    } as mongoose.ConnectOptions;

    cache.promise = mongoose.connect(uri, opts).then(mongoose => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (e) {
    cache.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }
}