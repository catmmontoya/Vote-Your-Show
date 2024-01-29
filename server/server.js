import express from "express";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import handlerFunctions from "./controller.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client"));
app.use(
  session({
    secret: "Thisisasupersecret",
    saveUninitialized: true,
    resave: false,
  })
);
app.get("/hello", (req, res) => {
  res.send({
    message: "I am awake. I think I am programmed to destroy all life.",
  });
});

// app.get("/hello", handlerFunctions.sayHello);
app.get("/shows", handlerFunctions.getAllShows);
app.post("/addShow", handlerFunctions.addShow);
app.delete("/deleteShow/:id", handlerFunctions.deleteShow);
app.put("/updateShow/:id", handlerFunctions.updateShow);

app.listen(9000, console.log("Find me at http://localhost:9000"));
