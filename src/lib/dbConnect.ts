import mongoose from 'mongoose';

const connection: {
  isConnected: number;
} = {
  isConnected: 0,
};
const options = {
  maxPoolSize: 10,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  tls: true,
  tlsAllowInvalidCertificates: true,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', options);
    connection.isConnected = db.connections[0].readyState;
    console.log('DB Connected', connection.isConnected);
  } catch (err) {
    console.log('Error connecting to DB', err);
    process.exit(1);
  }
}

export default dbConnect;
