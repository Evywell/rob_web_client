import React from 'react';
import PacketTemplate from '../PacketTemplate/PacketTemplate'
import socketIOClient from "socket.io-client";
import './dashboard.css';
import templates from '../../templates.js'
const ENDPOINT = 'http://localhost:2222';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            packets: [],
            fields: [],
            currentOpcode: null
        };
        this.templates = templates;
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

        const sendBtn = this.state.fields.length > 0 ? <button className="btn btn-primary" onClick={this.sendPacket}>Envoyer</button> : '';

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9" style={{marginTop: '25px'}}>
                        <div className="row">
                            <div className="col-md-8">
                                <table className="table" style={{marginTop: '25px'}}>
                                    <tbody>
                                    {
                                        this.templates.map((template) => {
                                            return (
                                                <tr key={template.name}>
                                                    <td>{template.name}</td>
                                                    <td><button className="btn btn-secondary" onClick={() => this.setState({ fields: template.fields, currentOpcode: template.name })}>{template.description}</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-4">
                                <PacketTemplate name={this.state.currentOpcode} onFieldChange={this.handleChange} fields={this.state.fields} />
                                {sendBtn}
                            </div>
                        </div>
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