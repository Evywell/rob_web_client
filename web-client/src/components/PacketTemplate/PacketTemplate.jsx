import React from 'react'

export default class PacketTemplate extends React.Component {

    render () {
        return (
            <div>
                <h3>{this.props.name}</h3>
                {this.props.fields.map((field, key) => {
                    return (
                        <div className="form-group" key={key}>
                            <label htmlFor={field.name}>{field.title}</label>
                            <input className="form-control" type="text" id={field.name} data-field={field.name} value={field.value} onChange={this.props.onFieldChange}/>
                        </div>
                    )
                })}
            </div>
        )
    }

}