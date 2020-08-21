import React from 'react';
import PacketTemplate from '../PacketTemplate/PacketTemplate'
import socketIOClient from "socket.io-client";
import './dashboard.css';
const ENDPOINT = 'http://localhost:2222';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            packets: [],
            fields: [],
            currentOpcode: null
        }
        this.templates = [
            {
                name: "CMSG_INVOKE_CHARACTER_IN_WORLD",
                description: "Invoquer un personnage dans le monde",
                fields: [
                    {
                        name: "character_uuid",
                        title: "UUID du personnage",
                        value: ''
                    }
                ]
            }
        ]
        this.handleChange = this.handleChange.bind(this);
        this.sendPacket = this.sendPacket.bind(this);
    }

    componentDidMount() {
        this.socket = socketIOClient(ENDPOINT);
        this.socket.on('new-packets', (pcks) => {
            this.setState({ packets: pcks });
        })
    }

    sendPacket () {
        if (this.state.fields.length === 0) {
            return;
        }
        this.socket.emit('send-packet', {opcode: this.state.currentOpcode, fields: this.state.fields});
    }

    handleChange (e) {
        const fieldName = e.target.getAttribute('data-field');
        const fields = this.state.fields;
        const value = e.target.value;
        this.setState(() => ({ fields:
            fields.map((field) => {
                if (field.name === fieldName) {
                    field.value = value;
                }
                return field;
            })
        }))
    }

    render() {
        const packetList = this.state.packets.map((packet, i) => {
            return (
                <li className="list-group-item packet-list-item" key={i}>
                    <div>
                        <b>{packet.opcode}: {packet.packet.name}</b>
                    </div>
                    <div className="packet-list-item__content" dangerouslySetInnerHTML={{__html: packet.packet.htmlContent}} />
                </li>
            )
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                        {
                            this.templates.map((template) => {
                                return (
                                    <p key={template.name}>
                                        <b>{template.name}</b><br/>
                                        <button onClick={() => this.setState({ fields: template.fields, currentOpcode: template.name })}>{template.description}</button>
                                    </p>
                                )
                            })
                        }

                        <PacketTemplate onFieldChange={this.handleChange} fields={this.state.fields} />
                        <button onClick={this.sendPacket}>Envoyer</button>
                    </div>
                    <div className="col-md-3">
                        <ul className="list-group packet-list">
                            {packetList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default Dashboard;