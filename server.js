const express = require('express');

const server = express();

const projectRouter = require('./routes/project.js');
const actionRouter = require('./routes/action.js');

server.use(express.json());
server.use(logger);

server.use('/projects', projectRouter);
server.use('/actions', actionRouter);





//custom middleware

function logger(req, res, next) {
    

    next();
  };


module.exports = server; 