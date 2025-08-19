import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connect: null, promise: null };
}

async function connectDB() {
  if (cached.connect) {
    return cached.connect;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/snapcart`, opts)
      .then((mongoose) => mongoose);
  }

  cached.connect = await cached.promise;
  return cached.connect;
}

export default connectDB;
