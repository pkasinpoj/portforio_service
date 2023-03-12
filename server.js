require("dotenv").config;
const express = require("express");
const cors = require("cors");
const path = require("path");
const contactRoute = require("./route/contactRoute");
const bodyParser = require("body-parser");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// creating the middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// app.use(
//   cors({
//     origin: ["https://portfolioview-colon007march.vercel.app/"],
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );
// app.use(function (req, res, next) {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://portfolioview-colon007march.vercel.app/"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept,accesstoken"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
// app.get("/", (req, res) => {
//   res.send("Access denied!");
// });
app.use("/", contactRoute);
// app.use("/contact", contactRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const port = process.env.PORT || 5000;
app.listen(port, console.log("server is listening to port 5000"));
