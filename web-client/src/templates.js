export default [
    {
        name: "INVOKE_CHARACTER_IN_WORLD",
        description: "Invoquer un personnage dans le monde",
        fields: [
            {
                name: "character_uuid",
                title: "UUID du personnage",
                value: ''
            }
        ]
    },
    {
        name: "INVOKE_CHARACTER_CLIENT_READY",
        description: "Marquer le client comme prêt",
        fields: [
            {
                name: "client_time",
                title: "Latence joueur",
                value: 0
            }
        ]
    },
    {
        name: "MOVE_CHANGE",
        description: "Se déplacer",
        fields: [
            {
                name: "guid",
                title: "GUID",
                value: ''
            },
            {
                name: "pos_x",
                title: "Position X",
                value: 0
            },
            {
                name: "pos_y",
                title: "Position Y",
                value: 0
            },
            {
                name: "pos_z",
                title: "Position Z",
                value: 0
            },
            {
                name: "orientation",
                title: "Orientation",
                value: 0
            },
            {
                name: "flags",
                title: "Flags",
                value: 0
            }
        ]
    }
];