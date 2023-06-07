// imports
const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cardRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const slideRoutes = require("./routes/slideRoutes");

// variables
const PORT = 8080;
const app = express();

// global variables
global.userIN = null;

// Connect DB
mongoose
  .connect(
    "mongodb+srv://ilaha:ilaha2002@database.jbmanhz.mongodb.net/Fullstack?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB database connection successful");
  })
  .catch((err) => {
    console.error("MongoDB database connection error: " + err);
  });

// middlewares
app.use(body_parser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  session({
    secret: "my_user",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://ilaha:ilaha2002@database.jbmanhz.mongodb.net/Fullstack?retryWrites=true&w=majority",
    }),
  })
);

// routes
app.use("/", cardRoutes);
app.use("/category", categoryRoutes);
app.use("/user", userRoutes);
app.use("/slide", slideRoutes);
app.use("/user/login", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});