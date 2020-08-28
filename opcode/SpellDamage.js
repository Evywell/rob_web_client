export default function SpellDamage (opcode, name, packet) {
    const sourceGuid = packet.readLong();
    const targetGuid = packet.readLong();
    const damages = packet.readInt();

    return {
        opcode,
        name,
        htmlContent: `
            <ul>
                <li><b>SOURCE GUID: </b> ${sourceGuid}</li>
                <li><b>TARGET GUID: </b> ${targetGuid}</li>
                <li><b>DAMAGES: </b> ${damages}</li>
            </ul>
        `
    }
}