require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4200;
const patients = require("./routes/patients");

app.use(cors());
app.options('*', cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/patients", patients);

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});

module.exports = app;