const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://chris:QO2swrn2Di4oyPqD@cluster0.k8yfu.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postsRoutes);



module.exports = app;
