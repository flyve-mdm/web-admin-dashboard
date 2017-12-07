import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import FleetsEditItemList from './FleetsEditItemList'
import ItemList from '../ItemList'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class FleetsEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListArray:[]
        }
    }

    componentWillMount() {
        var newArray = []

        this.props.itemList.map((value, index) =>
            newArray.push(value)
        )

        this.setState({
            itemListArray: newArray
        })
    }

    updateItemList = (index, name) => {
        var newItem = this.state.itemListArray

        //Find index of specific object using findIndex method.    
        var objIndex = newItem.findIndex((obj => obj["PluginFlyvemdmFleet.id"] === index));

        //Update object's name property.
        newItem[objIndex]["PluginFlyvemdmFleet.name"] = name

        this.setState({
            itemListArray: newItem
        })
    }

    handleSaveFleets = () => {

        this.props.changeSelectionMode(false)
        this.props.changeActionList(null)
        this.props.onNavigate([this.props.location[0]])
        this.props.changeItemList([this.props.location[0]], { itemList: ItemList(this.props.location[0], this.state.itemListArray) })
    }

    render() {
        let selectedItemList
        let selectedIndex = this.props.location.length === 2 ? this.props.location[1] : null
        
        if (typeof selectedIndex === 'number') {
            selectedIndex = [selectedIndex]
        }
        
        if(selectedIndex !== null) {
            
            let renderComponent = selectedIndex.map((index) => {
                selectedItemList = this.props.itemList.getAt(index)                                
                return (
                    <FleetsEditItemList
                    key={index}
                    updateItemList={this.updateItemList}
                    itemListPaneWidth={this.props.itemListPaneWidth}
                    location={this.props.location}
                    currentItem={selectedItemList}
                    changeActionList={this.props.changeActionList} />
                )
            })

            return(
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Edit {this.props.location[0]} </h2>
                        <button className="win-button win-button-primary" onClick={this.handleSaveFleets}>
                            Save
                        </button>
                    </div>
                    <div className="separator" />
                    {renderComponent}
                </ContentPane>
            )

            
        } else {
            return (
                <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        }
    }
}
FleetsEdit.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array
    ]),
    itemList: PropTypes.object.isRequired,
    actionList: PropTypes.string,
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired
}
