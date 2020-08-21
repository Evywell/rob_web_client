function getCharacterInfos (numChars, packet) {
    let template = '<ul>';
    for (let i = 0; i < numChars; i++) {
        template += `
        <li>
            <b>UUID:</b> ${packet.readInt()}<br />
            <b>Nom:</b> ${packet.readString()} 
        </li>
        `;
    }
    return template += '</ul>';
}

export default function AccountCharacterList (opcode, name, packet) {
    const numChars = packet.readInt();
    return {
        opcode,
        name,
        htmlContent: `
            Nombre de personnages: ${numChars}
            ${getCharacterInfos(numChars, packet)}
        `,
        num_characters: packet.readInt()
    }
}