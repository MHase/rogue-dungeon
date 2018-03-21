import io from 'socket.io-client';

const Client = {};
Client.socket = io.connect('http://localhost:8081');

Client.askNewPlayer = () => {
  Client.socket.emit('newplayer');
};

export default Client;
