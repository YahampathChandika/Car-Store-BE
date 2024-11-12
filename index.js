const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const routes = require("./routes/index.routes");
const PORT = 4003;

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", routes);

const db = require("./models");

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log("SERVER RUNNING ON PORT " , PORT);
  });
});
