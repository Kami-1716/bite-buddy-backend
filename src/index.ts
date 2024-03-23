import app from "./app";
import connectDB from "./db";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error while starting the server: ", error);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to the database: ", error);
  });
