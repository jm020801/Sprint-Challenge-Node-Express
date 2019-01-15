const express = require('express');
const actionsRouter = require('./action/actionsRouter.js');
const projectsRouter = require('./action/projectsRouter.js');

const server = express();

server.use(express.json());
server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter);


server.get('/', (req, res) => {
    res.send('server connected');
});


module.exports = server; 