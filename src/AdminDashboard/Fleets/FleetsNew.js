import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FleetsNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    newFleet = () => {
        let item = this.props.itemList
        item.push(
            {
                "PluginFlyvemdmFleet.name": this.state.name,
                "PluginFlyvemdmFleet.id": 100,
                "PluginFlyvemdmFleet.PluginFlyvemdmTask.items_id": null,
                "PluginFlyvemdmFleet.PluginFlyvemdmTask.itemtype": null,
                "PluginFlyvemdmFleet.is_default": 1
            }
        )
        console.log(this.props)
        this.props.changeItemList(this.props.location, { itemList: item, sort: true })
        this.props.changeActionList(null)
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <h2 className="win-h2 titleContentPane" onClick={() =>this.changeSelectItem([])}>
                    New Fleet
                </h2>
                <input 
                    type="text" 
                    className="win-textbox" 
                    placeholder="Fleet Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.changeInput}
                    required
                />
                <br/>
                <button className="win-button" onClick={() => this.props.changeActionList(null)}>Cancel</button>
                <button 
                    className="win-button win-button-primary" 
                    style={{marginLeft: 10}}
                    onClick={this.newFleet}
                >
                    Save
                </button>
            </div>
        )
    }
}
FleetsNew.propTypes = {
    changeActionList: PropTypes.func.isRequired
}
