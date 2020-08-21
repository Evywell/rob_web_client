import AccountCharacterList from "./opcode/AccountCharacterList.js";
import InvokeCharacterInWorld from "./opcode/InvokeCharacterInWorld.js";

export default [
    {opcode: 201, name: "SMSG_ACCOUNT_CHARACTER_LIST", handler: AccountCharacterList},
    {opcode: 0x12D, name: "SMSG_INVOKE_CHARACTER_IN_WORLD", handler: InvokeCharacterInWorld}
]