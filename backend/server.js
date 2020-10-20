const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();
// const userRouter = require("./api/users/user_router");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const userRouter = require("./api/users/user_router");
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

//cookie
const HOUR = 1000 * 60 * 60;
const SESSION_NAME = 'libr';
SESSION_SECRET = 'secret';
const SESSION_LIFETIME = HOUR;
app.use(session({
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: SESSION_LIFETIME,
    sameSite: true,
  }
}));
//

//podłączenie do frontu
const routes = require('./config/routes');
const path = require("path");
app.set('views', path.join(__dirname, 'api/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + "/api/views/js"));
app.use('/', routes);
//

//uruchomienie serwera
app.use("/api/users", userRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serwer uruchomiony na porcie:", port);
});