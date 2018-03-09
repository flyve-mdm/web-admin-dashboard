import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../../components/Loading'
import Map from '../Map'
import GeolocationList from './GeolocationList'

export default class Geolocation extends Component {
    constructor() {
        super()
        this.state ={
          isLoading: true,
          locations: [],
          showLocations: []
        }
      }
    
    componentDidMount () {
        this.handleRefresh()
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItems !== prevProps.selectedItems) {
            this.setState({isLoading: true}, () => this.handleRefresh())
        }
    }

    requestLocation = async () => {
        try {
            await this.props.glpi.updateItem({
                itemtype: 'PluginFlyvemdmAgent', 
                id: this.props.selectedItems[0]['PluginFlyvemdmAgent.id'],
                input: {_geolocate: ""}
            })
            this.props.setNotification({
                title: 'Successfully',
                body: 'Request sent',
                type: 'success'
            })
            this.handleRefresh()
        } catch (error) {
            this.props.setNotification({
                title: error[0],
                body: error[1],
                type: 'alert'
            })
        }
    }

    handleRefresh = async () => {
        try {
            const response = await this.props.glpi.getSubItems({
                itemtype: 'Computer', 
                id: this.props.selectedItems[0]['PluginFlyvemdmAgent.Computer.id'], 
                subItemtype: 'PluginFlyvemdmGeolocation'
            })    
            this.setState({
                locations: response,
                isLoading: false
            })
        } catch (e) {
            this.props.setNotification({
                title: 'Error',
                body: 'Problems loading data',
                type: 'alert'
            })
            this.setState({  
                isLoading: false 
            })
        }
    }

    showLocations = (location) => {
        let showLocations = this.state.showLocations.map(element => element)
        const index = showLocations.map((e) => { return e['PluginFlyvemdmGeolocation.id'] }).indexOf(location['PluginFlyvemdmGeolocation.id'])
        if (index === -1) {
            showLocations.push(location)
        } else {
            showLocations.splice(index, 1)
        }
        this.setState({ showLocations })
    }

    render() {
        return this.state.isLoading ? 
            <Loading message="Loading..." /> : 
                (   
                    <React.Fragment>
                        <Map markers={this.state.showLocations}/>

                        <button className="btn --primary" style={{margin: 5}} onClick={this.requestLocation}>
                            Request current location
                        </button>

                        <GeolocationList locations={this.state.locations} showLocations={this.showLocations} />
                    </React.Fragment>
                )
    }
}

Geolocation.propTypes = {
    selectedItems: PropTypes.array,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}