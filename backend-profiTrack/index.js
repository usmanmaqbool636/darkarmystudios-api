var express = require('express'),
    cors = require('cors'),
    bodyparser = require('body-parser'),
    dotenv = require('dotenv'),
    morgan = require("morgan");
    helmet = require('helmet'),
    mongoose = require('mongoose');

//App initialization
const app = express();
dotenv.config();   

const db = process.env.MONGO_URI;
const port = Number(process.env.PORT || 3000);

//Middleware packages
app.use(cors());
app.use(require('morgan')('dev'));
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

mongoose
  .connect(`${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase has been connected!"))
  .catch((err) => console.log("Cannot connect to database", err.message));

// TODO I think should be start from /api 
app.use("/", require('./src/routes/api/index.js'));

app.listen(port, () => {
    console.log('Server is listening on:', port);
})
