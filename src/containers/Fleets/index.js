import React, { Component } from 'react'
import withGLPI from '../../hoc/withGLPI'
import GenerateRoutes from '../../components/GenerateRoutes'
import FleetsList from './components/FleetsList'
import routes from './routes'
import { updateObject } from '../../shared/updateObject'

class Fleets extends Component {
  constructor(props) {
    super(props)
    this.state = {
        fleetsData: null,
        policiesData: null,
        tasksData: null,        
        fleetSelected: null,
        policyCategoriesData: null,
        filesData: null,
        applicationsData: null
    }
  }

  setFleets = (fleetsData) => {
    this.setState({
      fleetsData: fleetsData
    })
  }
 
  fecthPolicies = async () => {  
    const response = await this.props.glpi.searchItems({
        itemtype: 'PluginFlyvemdmPolicy', 
        options: { 
            uid_cols: true, 
            forcedisplay: [1, 2, 3, 4, 6],
            range: '0-50' // Can more than 50 items
        }
    })

    this.setState({ policiesData:  response.data });
  }

  fetchTasks = async () => {
    /*
     * Name, ID, Category ID, Policy ID
     * */
    const response = await this.props.glpi.getSubItems({
        itemtype: 'PluginFlyvemdmFleet',
        id: this.state.fleetSelected['PluginFlyvemdmFleet.id'],
        subItemtype: 'PluginFlyvemdmTask',
        options: { 
            uid_cols: true, 
            forcedisplay: [1, 2, 3, 4, 6]
        }
    })

    this.setState({ tasksData: response });
  }

  fetchPolicyCategories = async () => {
    /*
     * Name, ID
     * */
    const response = await this.props.glpi.searchItems({
      itemtype: 'PluginFlyvemdmPolicyCategory',
      options: { 
          uid_cols: true, 
          forcedisplay: [1, 2]
      }
    })

    this.setState({ policyCategoriesData: response.data });
  }

  fetchFile = async () => {
    /* 
    * Id and Name of file
    */
    const response = await this.props.glpi.searchItems({
      itemtype: 'PluginFlyvemdmFile',
      options: {
        uid_cols: true,
        forcedisplay: [
          1, 2, 3
        ],
        range: '0-50' // Can more than 50 items
      }
    })

    this.setState({ filesData: response.data });
  }

  fetchApplication = async () => {
    /* 
    * Id and Alias
    */
    const response = await this.props.glpi.searchItems({
      itemtype: 'PluginFlyvemdmPackage',
      options: {
        uid_cols: true,
        forcedisplay: [
          1,2,3,4,5,6
        ],
        range: '0-50' // Can more than 50 items
      }
    })

    this.setState({ applicationsData: response.data });
  }

  componentDidMount = () => {
    this.fecthPolicies()
    this.fetchPolicyCategories()
    this.fetchFile()
    this.fetchApplication()
  }

  handleClickFleet = (fleetData) => {
    this.setState({ fleetSelected: {...fleetData} },
      () => {
        this.props.history.push(`/app/fleets/${fleetData["PluginFlyvemdmFleet.id"]}`)
      }
    );
  }

  updateFleetSelect = (newFleetData) => {
    // Update FleetSelected and FleetsData
    const newFleetSelected = updateObject(this.state.fleetSelected, newFleetData)

    this.setState({
      fleetSelected: newFleetSelected
    })

    const newFleetsData = [
      ...this.state.fleetsData
    ]

    const index = newFleetsData.findIndex(
      fleet => fleet['PluginFlyvemdmFleet.id'] === newFleetSelected['PluginFlyvemdmFleet.id']
    )

    newFleetsData[index] = newFleetSelected

    this.setState({
      fleetsData: newFleetsData
    })
  }

  render() { 
    return ( 
      <FleetsList 
        glpi={this.props.glpi}
        fleetSelected={this.state.fleetSelected}
        handleClickFleet={this.handleClickFleet}
        fleetsData={this.state.fleetsData}
        setFleets={this.setFleets}
      >
        <GenerateRoutes routes={routes} rootPath={this.props.match.url} data={{
            policiesData: this.state.policiesData,
            fleetSelected: this.state.fleetSelected,
            tasksData: this.state.tasksData,
            fetchTasks: this.fetchTasks,
            policyCategoriesData: this.state.policyCategoriesData,
            filesData: this.state.filesData,
            applicationsData: this.state.applicationsData,
            updateFleetSelect: this.updateFleetSelect
          }}/>
      </FleetsList>
    )
  }
}

export default withGLPI(Fleets);