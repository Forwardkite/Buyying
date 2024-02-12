const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const session = require("express-session");
const bcrypt = require("bcryptjs");
const connectionDB = require("./config/connection");
const cors = require("cors");
const passport = require("./controllers/passport");

const app = express();
connectionDB();

const clientOrigin = process.env.REACT_APP_CLIENT_ORIGIN;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials if needed (e.g., cookies)
  })
);
/*_________________________________________VIEW ENGINE SETUP________________________________________*/

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/*____________________________________________________________________________________________________*/

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/*__________________________________________________*ADMIN_ROUTES*____________________________________________*/

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);
app.use("/uploads", express.static("uploads"));

/*__________________________________________________*ROUTES*____________________________________________*/

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const registrationRoutes = require("./routes/registration");
const productsRoutes = require("./routes/products");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");
const logoutRoute = require("./routes/logoutRoute");

app.use("/", indexRouter);
app.use("/registration", registrationRoutes);
app.use("/logout", logoutRoute);
app.use("/login", loginRoutes);
app.use("/users", usersRouter);
app.use("/products", productsRoutes);
app.use("/dashboard", dashboardRoutes);
// app.use('/api',routesMiddleware);

/*_________________________________________________ERROR HANDLERS____________________________________________*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/*______________________________________________________________________________________________________________*/

module.exports = app;
