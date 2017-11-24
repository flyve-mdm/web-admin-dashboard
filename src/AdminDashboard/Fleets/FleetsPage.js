import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'
import FleetsAdd from './FleetsAdd'
import FleetsNew from './FleetsNew'
import FleetsContent from './FleetsContent'

export default class FleetsPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
            if(this.props.actionList === null) {
                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                        </div>
                    </div>
                )
            } else {
                switch (this.props.actionList) {
        
                    case "Add_":
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <FleetsAdd />
                        </div>
                    )
                    case "Add":
                    return (
                        <div className="contentPane listPane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                            <FleetsNew 
                            location={this.props.location}
                            itemList={this.props.itemList} 
                            changeItemList={this.props.changeItemList}
                            changeActionList={this.props.changeActionList}
                            changeCurrentItem={this.props.changeCurrentItem} />
                        </div>
                    )
                    case "Add Tasks":

                        return (
                            <FleetsContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location} 
                            itemList={this.props.itemList}
                            currentItem={this.props.currentItem}/>
                        )
                    default: 
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                            </div>
                        </div>
                    )
                }
            }
            
        } else {
            let selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)
            return (
                <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                        <div className="itemInfo">
                            <IconItemList size={72} />
                            <div className="contentStatus">
                                <div className="name">{selectedItemList["PluginFlyvemdmFleet.name"]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                </div>
            )
        }
    }
}
FleetsPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.number,
    itemList: PropTypes.object.isRequired,
    actionList: PropTypes.string,
    changeItemList: PropTypes.func,
    changeActionList: PropTypes.func
}
