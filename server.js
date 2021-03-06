const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// app.use('/css', express.static(path.join(__dirname, '/css')));
// app.use('/js', express.static(path.join(__dirname, 'dist/js')));
// app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use(express.static('build')); // make whole build folder public so we can access files inside

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(process.env.PORT || 8081, () => { // gives us any avaiable port provided by heroku or listens to port 8081
  console.log('Listening on', server.address().port);
});

server.lastPlayerID = -1; // Keep track of the last id assigned to a new player
// start counting from 0, so our array won't be empty at the beggining

function getAllPlayers(id) {
  console.log(id);
  const players = [];
  Object.keys(io.sockets.connected).map((socketID) => {
    const player = io.sockets.connected[socketID].player; // eslint-disable-line
    if (player) players.push(player);
    return null;
  });
  console.log('server || running allPlayers\n', players);
  return players;
}

io.on('connection', (socket) => {
  socket.on('newplayer', (coordinates) => {
    socket.player = {
      id: server.lastPlayerID += 1,
      x: coordinates.x,
      y: coordinates.y,
    };

    socket.emit('allplayers', getAllPlayers(socket.player.id));
    socket.broadcast.emit('newplayer', socket.player); // sends a message to all connected sockets, except the socket who triggered the callback
    console.log('new player connected with id:', socket.player.id);

    socket.on('move', (coords) => {
      socket.player.x = coords.x;
      socket.player.y = coords.y;
    });

    socket.on('update', (data) => {
      socket.broadcast.emit('updatePlayer', {
        player: data.player,
        animation: data.animation,
        id: socket.player.id,
      });
    });

    socket.on('chatMessage', (message) => {
      console.log('server received and send -', message);
      io.emit('chatMessageInsert', message);
    });

    socket.on('disconnect', () => {
      io.emit('remove', socket.player.id);
      console.log('player disconnected', socket.player.id);
    });
  });
});
