import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  timeout: 10000
});

socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('connect_error', (error) => {
  console.error('Connection failed:', error);
});