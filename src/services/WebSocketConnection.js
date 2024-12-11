import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const client = new Client({
    brokerURL: 'ws://localhost:8080/ws', // Use your backend URL
    connectHeaders: {},
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
});

export default client;
