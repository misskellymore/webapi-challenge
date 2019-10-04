const express = require('express');

const server = express();

const projectRouter = require('./routes/project.js');

server.use(express.json());
server.use(logger);

server.use('/projects', projectRouter);





//custom middleware

function logger(req, res, next) {
    

    next();
  };


module.exports = server; 