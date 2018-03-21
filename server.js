const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

// app.use('/css', express.static(path.join(__dirname, '/css')));
// app.use('/js', express.static(path.join(__dirname, 'dist/js')));
// app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use(express.static('build')); // make whole build folder public so we can access files inside

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(8081, () => { // Listens to port 8081
  console.log('Listening on', server.address().port);
});

server.lastPlayerID = 0; // Keep track of the last id assigned to a new player

function getAllPlayers() {
  const players = [];
  Object.keys(io.sockets.connected).forEach((socketID) => {
    const player = io.sockets.connected[socketID].player; // eslint-disable-line
    if (player) players.push(player);
  });
  return players;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low); // eslint-disable-line
}

io.on('connection', (socket) => {
  socket.on('newplayer', () => {
    socket.player = {
      id: server.lastPlayerID += 1,
      x: randomInt(0, 100),
      y: randomInt(0, 100),
    };
    console.log('new player connected', socket.player.id);
    socket.emit('allplayers', getAllPlayers());
    socket.broadcast.emit('newplayer', socket.player); // sends a message to all connected sockets, except the socket who triggered the callback

    socket.on('disconnect', () => {
      io.emit('remove', socket.player.id);
      console.log('player disconnected', socket.player.id);
    });
  });
});
