import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Inventory from './Inventory'

class SystemReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            agent: undefined,
            isLoading: false
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({
                agent: undefined,
                isLoading: false
            })
            this.handleRefresh()
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {

        try {
            this.setState({
                isLoading: true
            })
            const agent = await this.props.glpi.getAnItem('PluginFlyvemdmAgent', this.props.selectedItemList[0]['PluginFlyvemdmAgent.id'], null)
            this.setState({
                isLoading: false,
                agent
            })
        } catch (error) {
            console.log(error)
        }
    }            

    render() {
        if (this.state.isLoading && !this.state.agent) {
            return (
                <div className="system-report">
                </div>
            )
        } else if (!this.state.isLoading && this.state.agent){
            return (
                <div className="system-report">
                    <div className="title">Agent</div>
                    <div className="list-content">
                        <div className="list-col">ID</div>
                        <div className="list-col">{this.state.agent['id']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Name</div>
                        <div className="list-col">{this.state.agent['name']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Version</div>
                        <div className="list-col">{this.state.agent['version']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Last contact</div>
                        <div className="list-col">{this.state.agent['last_contact']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Last report</div>
                        <div className="list-col">{this.state.agent['last_report'] ? this.state.agent['last_report'] : 'N/A'}</div>
                    </div>

                    <Inventory 
                        title='Fleet'
                        itemType='PluginFlyvemdmFleet'
                        itemID={this.state.agent['plugin_flyvemdm_fleets_id']}
                        fields={{id: 'ID', name: 'Name'}}
                        glpi={this.props.glpi}
                    />
                    
                </div>
            )
        } else {
            return (
                <div className="system-report">
                </div>
            )
        }
    }
}

SystemReport.propTypes = {
    selectedItemList: PropTypes.array.isRequired
}

export default SystemReport