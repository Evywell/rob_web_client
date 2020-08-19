export default function (opcode, name, packet) {
    return {
        opcode,
        name,
        token: packet.readString()
    }
}