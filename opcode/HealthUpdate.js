export default function HealthUpdate (opcode, name, packet) {
    const guid = packet.readLong();
    const health = packet.readInt();

    return {
        opcode,
        name,
        htmlContent: `
            <ul>
                <li><b>GUID: </b> ${guid}</li>
                <li><b>HEALTH: </b> ${health}</li>
            </ul>
        `
    }
}