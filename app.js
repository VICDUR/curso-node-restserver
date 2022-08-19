require('dotenv').config()

const Server = require('./models/servers');
// const {Server } = require('./models');

const server = new Server()

server.listen();

