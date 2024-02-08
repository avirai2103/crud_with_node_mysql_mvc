const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// a route for home page
app.get("/home", (req, res) => {
  res.json({ message: "NodeJs CRUD Application" });
});

// require("./routes/employee.routes.js")(app);
require ('./routes/course.routes.js')(app)
require ('./routes/projectroute.js')(app)

// setting port to 4500, & listening for requests http request.
app.listen(4500, () => {
  console.log("Server is running on port 4500.");
});