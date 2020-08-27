import net from 'net';
import express from 'express'
import config from './config.js';
import handlers from './handlers.js';
import Packet from './network/Packet.js';
import {createServer} from 'http'
import socketIO from 'socket.io';
import OpcodeManager from "./network/OpcodeManager.js";
import {getFieldByName} from "./opcode/helpers/helpers.js";

const app = express();
const http = createServer(app);
const io = socketIO(http);
const clientAuth = new net.Socket();
const clientGame = new net.Socket();
const authHost = config.auth_host;
const authPort = config.auth_port;
const gameHost = config.game_host;
const gamePort = config.game_port;

var token;

const packets = [];

String.prototype.getBytes = function () {
    let bytes = [];
    for (let i = 0; i < this.length; ++i) {
        bytes.push(this.charCodeAt(i));
    }
    return bytes;
};

const opcodeManager = new OpcodeManager();
for (let handler of handlers) {
    opcodeManager.register(handler.opcode, handler.name, handler.handler);
}

clientAuth.connect(authPort, authHost, () => {
    const login = config.login;
    const pass = config.password;
    
    console.log('Connected');
    const pck = new Packet(0);
    pck.putString(login);
    pck.putString(pass);
    clientAuth.write(pck.toBuffer());
});

clientAuth.on('data', (data) => {
    const pck = new Packet();
    pck.setDataInBuffer(data);
    const opcode = pck.getOpcode();
    switch (opcode) {
        case 1: // AUTH_LOGIN_SUCCEED
            // On s'authentifie au serveur de jeu avec le clientGame
            token = pck.readString();
            const authGameTicketPacket = new Packet(2);
            authGameTicketPacket.putString("ROB"); // game_code
            authGameTicketPacket.putString(token);
            clientAuth.write(authGameTicketPacket.toBuffer());
            break;
        case 3: // AUTH_GAME_TICKET_SUCCEED
            let ticket = pck.readString();
            gameServerAuthentication(ticket, token);
            break;
    }
    return;
});

clientGame.on('data', (data) => {
    const pck = new Packet();
    pck.setDataInBuffer(data);
    const opcode = pck.getOpcode();
    const managedPacket = opcodeManager.handle(opcode, pck);
    packets.push({opcode: opcode, packet: managedPacket});
    io.emit("new-packets", packets);
    console.log("OPCODE reçu: " + opcode);
})

function gameServerAuthentication (ticket, token) {
    clientGame.connect(gamePort, gameHost, () => {
        console.log("Connexion au serveur de jeu réussie");
        console.log("Authentification auprès du serveur de jeu en cours...");
        const authPacket = new Packet(0); // WORLD_AUTHENTICATION_CHALLENGE
        authPacket.putString(ticket);
        authPacket.putString(token);
        clientGame.write(authPacket.toBuffer());
    });
}

function preparePacket (opcode, fields) {
    // Pour le moment je fais un gros switch case
    let packet;
    switch (opcode) {
        case "INVOKE_CHARACTER_IN_WORLD":
            const characterUUIDField = getFieldByName(fields, "character_uuid");
            if (characterUUIDField === undefined) {
                console.error("Impossible d'envoyer le packet CMSG_INVOKE_CHARACTER_IN_WORLD car character_uuid inconnu");
                return null;
            }
            packet = new Packet(0x12C);
            packet.putInt(Number.parseInt(characterUUIDField.value, 10));
            return packet;
        case "INVOKE_CHARACTER_CLIENT_READY":
            const clientLatency = getFieldByName(fields, "client_time");
            packet = new Packet(0x12E);
            packet.putInt(0);
            packet.putInt(Number.parseInt(clientLatency.value, 10));
            return packet;
        case "MOVE_CHANGE":
            const guid = getFieldByName(fields, "guid");
            const posX = getFieldByName(fields, "pos_x");
            const posY = getFieldByName(fields, "pos_y");
            const posZ = getFieldByName(fields, "pos_z");
            const orientation = getFieldByName(fields, "orientation");
            const flags = getFieldByName(fields, "flags");
            packet = new Packet(0x131);
            packet.putInt(Number.parseInt(guid.value, 10));
            packet.putFloat(Number.parseFloat(posX.value));
            packet.putFloat(Number.parseFloat(posY.value));
            packet.putFloat(Number.parseFloat(posZ.value));
            packet.putFloat(Number.parseFloat(orientation.value));
            packet.putInt(Number.parseInt(flags, 10));
            return packet;
    }
    return null;
}

app.get('/', (req, res) => {
    res.send("Hello World");
});

io.on('connection', (socket) => {
   console.log("Un utilisateur s'est connecté au serveur");
   // Quand le mec est connecté, on lui envoie tout le bordel
    socket.on('send-packet', (packet) => {
        const p = preparePacket(packet.opcode, packet.fields);
        if (p !== null && p instanceof Packet) {
            clientGame.write(p.toBuffer());
        }
    });
    socket.emit("new-packets", packets);
});

http.listen(config.ws_port, () => {
    console.log("Web server listening...");
});