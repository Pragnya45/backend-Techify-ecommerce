const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = 8000 || process.env.PORT;

async function connection() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.log(err);
  }
}
connection().then(() => {
  console.log("connected to db");
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
