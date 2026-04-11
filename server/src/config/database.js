import mongoose from "mongoose";

let connectPromise = null;
let lastConnectionError = null;

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

const getDatabaseStatus = () => ({
  connected: isDatabaseConnected(),
  state: mongoose.connection.readyState,
  error: lastConnectionError?.message || null
});

const connectDatabase = async () => {
  if (isDatabaseConnected()) return mongoose.connection;
  if (connectPromise) return connectPromise;

  connectPromise = mongoose.connect(process.env.MONGODB_URL)
    .then((connection) => {
      lastConnectionError = null;
      return connection;
    })
    .catch((error) => {
      lastConnectionError = error;
      throw error;
    })
    .finally(() => {
      connectPromise = null;
    });

  return connectPromise;
};

export { connectDatabase, getDatabaseStatus, isDatabaseConnected };
