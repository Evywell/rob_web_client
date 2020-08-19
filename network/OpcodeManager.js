export default class OpcodeManager {

    opcodes = {}

    register (opcode, name, handler) {
        this.opcodes[opcode] = {
            opcode,
            name,
            handler
        }
    }

    handle (opcode, packet) {
        const opcodeInfos = this.opcodes.hasOwnProperty(opcode) ? this.opcodes[opcode] : null;
        if (opcodeInfos === null) {
            return false;
        }
        return opcodeInfos.handler(opcode, opcodeInfos.name, packet);
    }

}