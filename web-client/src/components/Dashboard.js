import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = 'http://localhost:2222';

function Dashboard() {

    const [packets, setPackets] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('new-packets', (pcks) => {
            setPackets(pcks);
        })
    }, [])

    const packetList = packets.map((packet, i) => {
       return (
           <li className="list-group-item" key={i}>
               <b>{packet.opcode}: {packet.packet.name}</b>
           </li>
       )
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">gauche</div>
                <div className="col-md-3">
                    <ul className="list-group">
                        {packetList}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;