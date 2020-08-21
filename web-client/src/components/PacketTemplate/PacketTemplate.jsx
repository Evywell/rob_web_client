import React from 'react'

export default class PacketTemplate extends React.Component {

    render () {
        return (
            <div>
                <form>
                {this.props.fields.map((field, key) => {
                    return (
                        <div className="form-group" key={key}>
                            <label htmlFor={field.name}>{field.title}</label>
                            <input type="text" id={field.name} data-field={field.name} value={field.value} onChange={this.props.onFieldChange}/>
                        </div>
                    )
                })}
                </form>
            </div>
        )
    }

}