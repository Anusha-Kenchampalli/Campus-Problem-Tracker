import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_problem_tracker';
    const maskedUri = connStr.replace(/:([^:@]+)@/, ':****@');
    console.log(`📡 Connecting to MongoDB URI: ${maskedUri}`);

    const conn = await mongoose.connect(connStr, {
      dbName: 'campus_problem_tracker'
    });
    console.log(`🍃 MongoDB Atlas Connected Successfully! Host: ${conn.connection.host}, Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

export default connectDB;

