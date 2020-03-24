const express = require('express');

const server = express();

const projects = require('./projects');
const actions = require('./actions');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server is working!');
});

server.use('/api/actions', actions)
server.use('/api/projects', projects)

module.exports = server;
