require("module-alias/register");
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!');
  });


  app.listen(4000, () => {
    console.log('Server started on port 4000');
  });