import io from 'socket.io-client';

const Client = {};
Client.socket = io();
// Client.socket = io.connect('http://localhost:8081');

Client.askNewPlayer = (coordinates) => {
  Client.socket.emit('newplayer', coordinates);
};

export default Client;
