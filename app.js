const express = require("express");
const app = express();
const port = 8080;

const mongoose = require("mongoose");
const path = require("path");
const homeRoute =require("./routes/homeroute");

const dotenv=require('dotenv');
dotenv.config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const ATLAS_URL= process.env.ATLAS_URL;

async function main() {
  await mongoose.connect(ATLAS_URL);
}

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/",homeRoute);
app.use("*",(req,res)=>{
    res.render("notfound.ejs");
})

app.listen(port, () => {
  console.log(`App is listening at port: ${port}`);
});
