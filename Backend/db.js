// 1. install mongoose => npm i mongoose
// import mongoose

import mongoose from "mongoose";

const mongoUri =
  process.env.MONGODB_URI ||
  "mongodb://gourisd007_db_user:qJjOmFYCZbJuqrOw@ac-xt2utck-shard-00-00.c9kuz1j.mongodb.net:27017,ac-xt2utck-shard-00-01.c9kuz1j.mongodb.net:27017,ac-xt2utck-shard-00-02.c9kuz1j.mongodb.net:27017/?ssl=true&replicaSet=atlas-ax7h7q-shard-0&authSource=admin&appName=Cluster0";

export const dbReady = mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  });