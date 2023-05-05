const express = require('express');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(express.json());

app.use('/user', userRouter);
app.use('/note', noteRouter);

app.get('/', (req, res) => {
  res.send('<h1>CRUD API Coded by ViKAS</h1>');
});
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
app.use(cors());

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
