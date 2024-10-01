import mongoose from 'mongoose';

const connection: {
  isConnected: number;
} = {
  isConnected: 0,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '');
    connection.isConnected = db.connections[0].readyState;
    console.log('DB Connected', connection.isConnected);
  } catch (err) {
    console.log('Error connecting to DB', err);
    process.exit(1);
  }
}

export default dbConnect;
