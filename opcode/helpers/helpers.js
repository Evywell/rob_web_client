export function getType (type) {
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

export function getGameObject (packet) {
    const guid = packet.readLong();
    const mapId = packet.readInt();
    const posX = packet.readFloat();
    const posY = packet.readFloat();
    const posZ = packet.readFloat();
    const orientation = packet.readFloat();
    const type = getType(packet.readInt());
    const name = ['UNIT', 'CREATURE', 'PLAYER'].indexOf(type) !== -1 ? packet.readString() : null;

    return {
        guid,
        mapId,
        posX,
        posY,
        posZ,
        orientation,
        type,
        name
    }
}

export function getGameObjectWithLatency (packet) {
    const data = getGameObject(packet);
    const latency = packet.readLong();
    return {...data, latency}
}

export function getMovement (packet) {
    return {
        guid: packet.readLong(),
        posX: packet.readFloat(),
        posY: packet.readFloat(),
        posZ: packet.readFloat(),
        orientation: packet.readFloat(),
        flags: packet.readInt()
    }
}

export function getFieldByName(fields, name) {
    return fields.find((field) => {
        return field.name === name;
    });
}