const express = require('express');
const actionsRouter = require('./action/actionsRouter.js');

const server = express();


server.use('/actions', actionsRouter);


server.get('/', (req, res) => {
    res.send('server connected');
});


module.exports = server; 