import mongoose from "mongoose";

export const LoadDB = () => {
  const DSN = process.env.DSN;
  mongoose.set("strictQuery", false);
  mongoose.connect(DSN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (err) => console.log(err));
  db.once("open", () => console.log("Database connection established"));
};
