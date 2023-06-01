const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const cors = require('cors')

connectDB();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));