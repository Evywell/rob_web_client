const net = require('net');
const client = new net.Socket();

const host = "192.168.1.19";
const port = 8888;

String.prototype.getBytes = function () {
    var bytes = [];
    for (var i = 0; i < this.length; ++i) {
        bytes.push(this.charCodeAt(i));
    }
    return bytes;
  };

client.connect(port, host, function() {
    const login = "admin";
    const pass = "admin";
    
    console.log('Connected');
    let length = 0;
    const buffer = Buffer.alloc(2048);
    buffer.writeIntBE(0, 0, 4);
    length += 4;
    buffer.writeIntBE(login.getBytes().length, length, 4);
    length += 4;
    buffer.write(login, length);
    length += login.getBytes().length;
    buffer.writeIntBE(pass.getBytes().length, length, 4);
    length += 4;
    buffer.write(pass, length);

    const lengthBuffer = Buffer.alloc(4);
    lengthBuffer.writeIntBE(buffer.length, 0, 4);

    const finalBuffer = Buffer.concat([lengthBuffer, buffer]);
    console.log(finalBuffer.length);
    client.write(finalBuffer);
	//client.write('Hello, server! Love, Client.');
});