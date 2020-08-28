export default class Packet {

    opcode = null;
    bufferData = [];
    cursor = 0;

    constructor (opcode = null) {
        this.opcode = opcode;
        if (this.opcode !== null) {
            this.putInt(this.opcode);
        }
    }

    putInt (value) {
        const b = new Buffer.alloc(4);
        b[0] = value;
        b[1] = value >> 8;
        b[2] = value >> 16;
        b[3] = value >> 24;
        this.bufferData = this.bufferData.concat([...b.reverse()]);
    }

    putLong (value) {
        let hex = BigInt(value).toString(16);
        if (hex.length % 2) { hex = '0' + hex; }

        const len = hex.length / 2;

        const u8 = new Uint8Array(8);

        const diff = 8 - len;

        for (let a = 0; a < diff; a++) {
            u8[a] = 0;
        }

        let i = diff;
        let j = 0;
        while (i < len + diff) {
            u8[i] = parseInt(hex.slice(j, j+2), 16);
            i += 1;
            j += 2;
        }

        this.bufferData = this.bufferData.concat([...Buffer.from(u8)])
    }

    putFloat (value) {
        let farr = new Float32Array(1);
        farr[0] = value;
        let barr = new Int8Array(farr.buffer);
        this.bufferData = this.bufferData.concat([...Buffer.from(barr.reverse())])
    }

    putString (value) {
        const length = value.length;
        this.putInt(length);
        this.bufferData = this.bufferData.concat([...Buffer.from(value)])
    }

    readInt () {
        const value = this.bufferData.slice(this.cursor, this.cursor + 4);
        this.cursor += 4;
        return (Buffer.from(value)).readIntBE(0, 4);
    }

    readLong () {
        const value = this.bufferData.slice(this.cursor, this.cursor + 8);
        this.cursor += 8;
        return ((Buffer.from(value)).readBigInt64BE(0));
    }

    readFloat () {
        const value = this.bufferData.slice(this.cursor, this.cursor + 4);
        this.cursor += 4;
        return (Buffer.from(value)).readFloatBE(0);
    }

    readString () {
        const strLength = this.readInt();
        const value = this.bufferData.slice(this.cursor, this.cursor + strLength);
        this.cursor += strLength;
        return (Buffer.from(value)).toString();
    }

    readByte () {
        const value = this.bufferData.slice(this.cursor, this.cursor + 1);
        this.cursor += 1;
        return value[0];
    }

    getOpcode () {
        if (this.opcode === null) {
            this.opcode = this.readInt();
        }
        return this.opcode;
    }

    setDataInBuffer (data) {
        const bufferLength = data.readIntBE(0, 4);
        const buffer = Buffer.from(data.buffer, 4, bufferLength);
        this.bufferData = [...buffer];
        this.cursor = 0;
    }

    toBuffer () {
        // On calcul la taille et on l'ajoute au début
        const bufferLength = this.bufferData.length;
        const b = new Buffer.alloc(4);
        b[0] = bufferLength;
        b[1] = bufferLength >> 8;
        b[2] = bufferLength >> 16;
        b[3] = bufferLength >> 24;
        const buffer = [...b.reverse()];
        return Buffer.from(buffer.concat(this.bufferData));
    }

}