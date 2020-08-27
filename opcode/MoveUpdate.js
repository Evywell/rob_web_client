import {getMovement} from "./helpers/helpers.js";

export default function MoveUpdate (opcode, name, packet) {
    const movement = getMovement(packet)
    return {
        opcode,
        name,
        htmlContent: `
            <ul>
                <li><b>GUID:</b> ${movement.guid}</li>
                <li><b>POS X:</b> ${movement.posX}</li>
                <li><b>POS Y:</b> ${movement.posY}</li>
                <li><b>POS Z:</b> ${movement.posZ}</li>
                <li><b>ORIENTATION:</b> ${movement.orientation}</li>
                <li><b>FLAGS:</b> ${movement.flags}</li>
            </ul>
        `
    }
}