export default function AccountCharacterList (opcode, name, packet) {
    return {
        opcode,
        name,
        num_characters: packet.readInt()
    }
}