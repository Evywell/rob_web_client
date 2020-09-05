import {getGameObject} from "./helpers/helpers.js";

export default function UpdateObject (opcode, name, packet) {
    const updateType = packet.readByte(); // 0: ADD 1: REMOVE
    let type, content;
    if (updateType === 1) {
        type = 'REMOVE OBJECT';
        content = `<li><b>UUID: </b>${packet.readLong()}</li>`;
    } else {
        const go = getGameObject(packet);
        type = 'ADD OBJECT';
        content = `
            <li><b>GUID:</b> ${go.guid}</li>
            <li><b>MAP ID:</b> ${go.mapId}</li>
            <li><b>POS X:</b> ${go.posX}</li>
            <li><b>POS Y:</b> ${go.posY}</li>
            <li><b>POS Z:</b> ${go.posZ}</li>
            <li><b>ORIENTATION:</b> ${go.orientation}</li>
            <li><b>TYPE:</b> ${go.type}</li>
            ${go.name !== null ? '<li><b>NAME:</b> ' + go.name + '</li>' : ''}
            ${go.health !== null ? '<li><b>HEALTH:</b> ' + go.health + '</li>' : ''}
        `;
    }
    return {
        opcode,
        name,
        htmlContent: `
            <ul>
                <li><b>UPDATE TYPE: </b> ${type}</li>
                ${content}
            </ul>
        `
    }
}