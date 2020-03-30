import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true });

app.use("/api/auth", auth);
app.use("/api/users", users);

// console.log(". = %s", path.resolve(".."));
// console.log("__dirname = %s", path.resolve(path.join(__dirname, '..','client/build')));

// Serve static files from the React frontend app
//app.use(express.static(path.join("..", 'semantic-search-client/build')))
app.use(express.static(path.join(__dirname, '..', 'client/build')))

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

console.log("__dirname = %s", path.resolve(path.join(__dirname, '..', 'client/build', 'index.html')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
})

app.listen(process.env.PORT || 8080, () => console.log("Running on localhost:8080"));
