import AccountCharacterList from "./opcode/AccountCharacterList.js";
import InvokeCharacterInWorld from "./opcode/InvokeCharacterInWorld.js";
import GameObjectInfo from "./opcode/GameObjectInfo.js";
import InvokeNewCharacterInWorld from "./opcode/InvokeNewCharacterInWorld.js";
import MoveUpdate from "./opcode/MoveUpdate.js";
import UpdateObject from "./opcode/UpdateObject.js";

export default [
    {opcode: 201, name: "SMSG_ACCOUNT_CHARACTER_LIST", handler: AccountCharacterList},
    {opcode: 0x12D, name: "SMSG_INVOKE_CHARACTER_IN_WORLD", handler: InvokeCharacterInWorld},
    {opcode: 0x12F, name: "SMSG_INVOKE_CHARACTER_CLIENT_READY", handler: () => { return {opcode: 0x12F, name: "SMSG_INVOKE_CHARACTER_CLIENT_READY", htmlContent: ''} }},
    {opcode: 0x132, name: "SMSG_GAME_OBJECT_INFO", handler: GameObjectInfo},
    {opcode: 0x12E, name: "SMSG_INVOKE_NEW_CHARACTER_IN_WORLD", handler: InvokeNewCharacterInWorld},
    {opcode: 0x131, name: "SMSG_MOVE_UPDATE", handler: MoveUpdate},
    {opcode: 0x133, name: "SMSG_UPDATE_OBJECT", handler: UpdateObject}
]