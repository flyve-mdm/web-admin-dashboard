import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FleetsList from './FleetsList'
import FleetsPage from './FleetsPage'
export default class Fleets extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectionMode: false
        }
    }

    changeSelectionMode = (selectionMode) => {
        this.setState({
            selectionMode
        })
    }

    render() {

        let selectedIndex = this.props.location.length === 2 ? this.props.location[1] : null
        if (this.props.mode === 'small') {
            if (selectedIndex === null && this.props.actionList === null) {
                return <FleetsList
                    itemListPaneWidth={'100%'}
                    dataSource={this.props.dataSource}
                    changeDataSource={this.props.changeDataSource}
                    fetchData={this.props.fetchData}
                    isLoading={this.props.isLoading}
                    isError={this.props.isError}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    changeCurrentItem={this.props.changeCurrentItem}
                    actionList={this.props.actionList}
                    changeActionList={this.props.changeActionList} />
            } else {
                return <FleetsPage
                    itemListPaneWidth={0}
                    dataSource={this.props.dataSource}
                    changeDataSource={this.props.changeDataSource}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    selectedIndex={selectedIndex}
                    changeSelectionMode={this.changeSelectionMode}
                    changeCurrentItem={this.props.changeCurrentItem}
                    actionList={this.props.actionList}
                    changeActionList={this.props.changeActionList} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <FleetsList
                        itemListPaneWidth={itemListPaneWidth}
                        dataSource={this.props.dataSource}
                        changeDataSource={this.props.changeDataSource}
                        fetchData={this.props.fetchData}
                        isLoading={this.props.isLoading}
                        isError={this.props.isError}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        changeSelectionMode={this.changeSelectionMode}
                        selectionMode={this.state.selectionMode}
                        currentItem={this.props.currentItem}
                        changeCurrentItem={this.props.changeCurrentItem}
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} />
                    <FleetsPage
                        itemListPaneWidth={itemListPaneWidth}
                        dataSource={this.props.dataSource}
                        changeDataSource={this.props.changeDataSource}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        selectedIndex={selectedIndex}
                        changeSelectionMode={this.changeSelectionMode}
                        currentItem={this.props.currentItem}
                        changeCurrentItem={this.props.changeCurrentItem}
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} />
                </div>
            )
        }
    }
}
Fleets.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    currentItem: PropTypes.object,
    changeCurrentItem: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    actionList: PropTypes.string
}
