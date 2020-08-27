import {getGameObjectWithLatency} from "./helpers/helpers.js";

export default function GameObjectInfo (opcode, name, packet) {
    const go = getGameObjectWithLatency(packet);
    return {
        opcode,
        name,
        htmlContent: `
            <ul>
                <li><b>Latence:</b> ${go.latency}</li>
                <li><b>GUID:</b> ${go.guid}</li>
                <li><b>MAP ID:</b> ${go.mapId}</li>
                <li><b>POS X:</b> ${go.posX}</li>
                <li><b>POS Y:</b> ${go.posY}</li>
                <li><b>POS Z:</b> ${go.posZ}</li>
                <li><b>ORIENTATION:</b> ${go.orientation}</li>
                <li><b>TYPE:</b> ${go.type}</li>
                ${go.name !== null ? '<li><b>NAME:</b> ' + go.name + '</li>' : ''}
            </ul>
        `,
    }
}