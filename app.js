const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const db = require("./connections/db");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
