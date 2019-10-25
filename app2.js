const express = require('express');
const app = express();
const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/gtfs', {useNewUrlParser: true});

const port = 3000;

app.use(require('./conf/AgenciesRoutes'));
app.use(require('./conf/GTFSRoutes'));
app.use(require('./conf/RoutesRoutes'));
app.use(require('./conf/StopsRoutes'));

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

async function startServer() {    
    app.listen(port, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Transit Schedules API. Server started on port: " + port);
    });
  }
  
  // Run the async function to start our server
  startServer();

// https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Express_Nodejs/roteamentos
// https://softwareontheroad.com/ideal-nodejs-project-structure/#architecture
// https://github.com/santiq/bulletproof-nodejs