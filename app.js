const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');
const mongoose = require('mongoose');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const uri = 'mongodb+srv://DuyKien:12345@cluster0.fusrtui.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log("connected to mongodb");
    app.use(express.json());
    app.use(routes);
    app.use(cors());
    app.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  })
  .catch((error) => {
    console.error(error);
  });
