const express = require("express");
const cors = require("cors"); // used for security among cross domain web application, when one webApp(origin A) requests another webApp(org B) cors check if ordB allows cross-origin communication
const Axios = require("axios"); // used in http request 
const { exec } = require("child_process"); // just to run specified command in terminal by itself
const app = express();
require("dotenv").config();

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog"); // not working at present
// const session = require("express-session");
// const MongoDbStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const PORT = 8000;

app.use(cors());
app.use(express.json());
// const http = require("http").createServer(app);

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/Collaboratory", {});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .on("error", function (err) {
    console.log(err);
  });

// session store -> 
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoDbStore({
//       mongooseConnection: mongoose.connection,
//       collection: "sessions", // Optional, specify the collection name
//       ttl: 24 * 60 * 60, // Optional, session expiration in seconds
//     }),
//   })
// );

app.use(cors());
app.use(express.json({ limit: "3mb" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});



//live server -> for pair programming
app.post("/run-live-server", (req, res) => {
  const command = "live-server --port=9000";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred");
      return;
    }
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
    res.send("live-server started successfully");
  });
});


// routes
app.use("/user", userRouter); // for handling login, register, authentication
app.use("/blog", blogRouter); // for handling blog card create , view

// app listening
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
