function getType (type) {
    switch (type) {
        case 0x01:
            return "GAME_OBJECT";
        case 0x02:
            return "UNIT";
        case 0x04:
            return "PLAYER";
        case 0x08:
            return "CREATURE";
        case 0x10:
            return "CHEST";
    }
}

export default function InvokeCharacterInWorld (opcode, name, packet) {
    const guid = packet.readLong();
    const mapId = packet.readInt();
    const posX = packet.readFloat();
    const posY = packet.readFloat();
    const posZ = packet.readFloat();
    const orientation = packet.readFloat();
    const type = getType(packet.readInt());
    const latency = packet.readLong();
    return {
        opcode,
        name,
        htmlContent: `
            <ul>
                <li><b>Latence:</b> ${latency}</li>
                <li><b>GUID:</b> ${guid}</li>
                <li><b>MAP ID:</b> ${mapId}</li>
                <li><b>POS X:</b> ${posX}</li>
                <li><b>POS Y:</b> ${posY}</li>
                <li><b>POS Z:</b> ${posZ}</li>
                <li><b>ORIENTATION:</b> ${orientation}</li>
                <li><b>TYPE:</b> ${type}</li>
            </ul>
        `,
    }
}