import mongoose from "mongoose";
export const connectDatabase = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL!)
    .then(() => {
      console.log("Database was connected successfully!");
    })
    .catch((err) => {
      console.log("Error connecting to the database");
      console.log(err);
      process.exit();
    });
};