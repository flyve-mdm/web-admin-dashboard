import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import WinJS from 'winjs'
import FleetsTaskItemList from './FleetsTaskItemList'
import Confirmation from '../../../components/Confirmation'

const POLICIES_CAN_MULTIPLE_VALUE = [
    14, // -> Deploy Application
    16, // -> Deploy File
]

class FleetsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
        }
    }
    
    handleFecthTask = async IdTask => {
        const tasksData = await this.props.route.data.fetchTasks(IdTask)
        this.setState({
            tasksData: this.state.tasksData.concat(tasksData)
        })
    }

    handleFleetHaveTask = policy => {
        let policyId = null
        const haveTask = this.state.tasksData.some((task) => {
            policyId = task['plugin_flyvemdm_policies_id']
            return policyId === policy['PluginFlyvemdmPolicy.id']
        });
        return haveTask
    } 

    componentDidMount = () => {
        this.handleFecthTask(this.props.route.data.fleetData['PluginFlyvemdmFleet.id'])
    }

    render() {
        console.log(this.props)
        let renderComponent
        if (this.props.policiesData) {
            renderComponent = this.props.policiesData.map((item, index) => {
                let multiplesValues = null
                const addedPolicy = this.handleFleetHaveTask(item)
                const IdPolicy = item['PluginFlyvemdmPolicy.id']
                if (addedPolicy && POLICIES_CAN_MULTIPLE_VALUE.includes(IdPolicy)) {
                    multiplesValues = this.props.tasksData.filter(task => (
                        task['plugin_flyvemdm_policies_id'] === IdPolicy
                    ))
                }

                return (
                    <FleetsTaskItemList
                        key={[item['PluginFlyvemdmPolicy.name'], index].join("_")}
                        data={item} 
                        addedPolicy={addedPolicy}
                        multiplesValues={multiplesValues} />
                )
            })
        }

        return ( 
            <div>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > Fleets </h2>
                    <div className="itemInfo">
                        <div className="contentStatus">
                            <div className="name">{this.props.route.data.fleetSelected["PluginFlyvemdmFleet.name"]}</div>
                            <br />
                            <span className="editIcon" style={{ marginRight: '20px' }} onClick={this.handleEdit} />
                            <span className="deleteIcon" onClick={this.handleDelete} />
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <div className="contentInfo" style={{ width: '100%', marginTop: '20px', marginBottom: '20px', display: 'inline-block' }} >
                    <h3 className="win-h3" style={{ display: 'inline-block' }} > Tasks </h3>
                </div>

                { renderComponent }

                <Confirmation title={`Delete Fleet`} message={this.props.route.data.fleetSelected["PluginFlyvemdmFleet.name"]} reference={el => this.contentDialog = el} />
            </div>
        )
    }
}

export default FleetsContent