/*
*   Copyright © 2018 Teclib. All rights reserved.
*
*   This file is part of web-mdm-dashboard
*
* web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
* device management software.
*
* Flyve MDM is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 3
* of the License, or (at your option) any later version.
*
* Flyve MDM is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* ------------------------------------------------------------------------------
* @author     Gianfranco Manganiello (gmanganiello@teclib.com)
* @author     Hector Rondon (hrondon@teclib.com)
* @copyright  Copyright © 2018 Teclib. All rights reserved.
* @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
* @link       https://github.com/flyve-mdm/web-mdm-dashboard
* @link       http://flyve.org/web-mdm-dashboard
* @link       https://flyve-mdm.com
* ------------------------------------------------------------------------------
*/

/** import dependencies */
import React, { PureComponent } from 'react'
import ReactWinJS from 'react-winjs'
import TasksDeployAppList from './TasksDeployAppList'
import TasksRemoveAppList from './TasksRemoveAppList'
import TasksDeployFileList from './TaskDeployFileList'
import TasksRemoveFileList from './TasksRemoveFileList'
import { I18n } from 'react-i18nify'

/**
 * @class FleetsTaskItemList
 * @extends PureComponent
 */
class FleetsTaskItemList extends PureComponent {
    /** @constructor */
    constructor(props) {
        super(props)
        this.state = {
            fleetHaveTask: this.props.fleetHaveTask,
            alreadyAdded: false,
            active: false,
            input:''
        }
    }

    /**
     * Update state fleets
     * @function updateState
     * @param {*} fleetHaveTask
     */
    updateState = (fleetHaveTask) => {
        if (fleetHaveTask) { 
            this.setState({
                alreadyAdded: true,
                active: true
            })
        } else {
            this.setState({
                alreadyAdded: false,
                active: false,
                input: ''
            })
        }
    }

    /**
     * Make sure that the state and props are in sync for when it is required
     * @static
     * @function getDerivedStateFromProps
     * @param {object} nextProps
     * @param {object} prevState
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        let input
        if (nextProps.data['PluginFlyvemdmPolicy.type'] === 'removeapp' ||
            nextProps.data['PluginFlyvemdmPolicy.type'] === 'removefile') {
            input = ''
        } else {
            input = nextProps.value ? nextProps.value : ''
        }

        if (nextProps.fleetHaveTask !== prevState.fleetHaveTask) {
            if(nextProps.fleetHaveTask) {
                return {
                    fleetHaveTask: nextProps.fleetHaveTask,
                    alreadyAdded: true,
                    active: true,
                    input: input
                }
            } else {
                return {
                    fleetHaveTask: nextProps.fleetHaveTask,
                    alreadyAdded: false,
                    active: false,
                    input: input
                }
            }
        } else {
            return {
                ...prevState
            }
        }
    }

    /**
     * Set state from fleets
     * @function componentDidMount
     */
    componentDidMount = () => {
        this.updateState(this.props.fleetHaveTask)
        let input
        if (this.props.data['PluginFlyvemdmPolicy.type'] === 'removeapp' ||
            this.props.data['PluginFlyvemdmPolicy.type'] === 'removefile') {
            input = ''
        } else {
            input = this.props.value ? this.props.value : ''
        }
        this.setState({
            input
        })
    }
    
    /**
     * handle when enable/disable policies
     * @function handleAddedToggle
     */
    handleAddedToggle = () => {
        if (!this.state.alreadyAdded) {
            this.props.addTask(this.props.data)
        } else {
            this.props.removeTask(this.props.data)
        }
        this.setState((prevState) => {
            return {
                alreadyAdded: !prevState.alreadyAdded
            }
        }) 
    }

    /**
     * Update task value
     * @function handleActivePolicyToggle
     */
    handleActivePolicyToggle = () => {
        switch (this.props.data['PluginFlyvemdmPolicy.type']) {
            case 'bool':
                this.props.updateValueTask(this.props.data, !this.props.value)
                break
            case 'int':
            case 'deployapp':
            case 'removeapp':
            case 'deployfile':
            case 'removefile':
                if(this.state.input.trim()) {
                    const value =  this.state.input
                    this.props.updateValueTask(this.props.data, value)
                    this.setState({input:''})
                }
                break
            default:
                break
        }
    }

    /**
     * Update task value when input change
     * @function handleChangeInput
     * @param {object} e
     */
    handleChangeInput = (e) => {
        switch (this.props.data['PluginFlyvemdmPolicy.type']) {
            case 'deployapp':
            case 'deployfile':
            case 'dropdown':
                if(e.target.value.trim()) {
                    this.props.updateValueTask(this.props.data, e.target.value)
                }
                break
            default:
                this.setState({ input: e.target.value })
                break
        }
    }

    /**
     * request update task value
     * @function handleBlurInput
     * @param {object} e
     */
    handleBlurInput = (e) => {
        this.handleActivePolicyToggle()
    }

    /**
     * Request task remove
     * @function handleRemoveTask
     * @param {*} task
     */
    handleRemoveTask = (task) => {
        this.props.removeValueTask(this.props.data, task)
    }

    /**
     * Get render show max/min version os
     * @function renderMinMaxVersion
     * @return {array}
     */
    renderMinMaxVersion = () => {
        let renderComponent = []

        if (this.props.data['PluginFlyvemdmPolicy.android_min_version'] !== 0) {
            renderComponent.push(
                <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_android_min`}>
                    <span className="badge android">
                        Android
                        <span className="tooltip">
                            {`> ${this.props.data['PluginFlyvemdmPolicy.android_min_version']} `}
                            {this.props.data['PluginFlyvemdmPolicy.android_max_version'] !== 0 ?
                                `< ${this.props.data['PluginFlyvemdmPolicy.android_max_version']} ` :
                                ''}
                        </span>
                    </span>
                </React.Fragment>
            )
        } else {
            renderComponent.push(
                <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_android_min`}>
                    <span className="badge not_available">
                        Android
                    <span className="tooltip">{I18n.t('commons.not_available')}</span>
                    </span>
                </React.Fragment>
            )
        }

        if (this.props.data['PluginFlyvemdmPolicy.apple_min_version'] !== 0) {
            renderComponent.push(
                <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_apple_min`}>
                    <span className="badge apple">
                        iOS
                        <span className="tooltip">
                            {`> ${this.props.data['PluginFlyvemdmPolicy.apple_min_version']} `}
                            {this.props.data['PluginFlyvemdmPolicy.apple_max_version'] !== 0 ? 
                            `< ${this.props.data['PluginFlyvemdmPolicy.apple_max_version']} ` :
                            ''}
                        </span>
                    </span>
                </React.Fragment>
            )
        } else {
            renderComponent.push(
                <React.Fragment key={`${this.props.data['PluginFlyvemdmPolicy.id']}_apple_min`}>
                    <span className="badge not_available">
                        iOS
                    <span className="tooltip">{I18n.t('commons.not_available')}</span>
                    </span>
                </React.Fragment>
            )
        }
        return renderComponent
    }

    /** 
     * Render component 
     * @function render
     */ 
    render() {
        if (this.props.data === undefined) {
            return (   
                <div className='files-list fleet-list' >
                    <div className='files-list__content'>
                        <div className='files-list__item'>
                            <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                <div className='files-list__content-text-primary'>
                                    {I18n.t('commons.not_available')}
                                </div>
                            </div>
                            <div className='files-list__item-content-secondary'>
                                <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch
                                        className="files-list__content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            switch (this.props.data["PluginFlyvemdmPolicy.type"]) {
                case "bool":
                let value = this.props.data['PluginFlyvemdmPolicy.default_value']
                if(typeof(value) !== "boolean") { value = true }
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`} >
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div
                                    className={`files-list__item-list-field files-list__checkbox ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`}
                                    onClick={this.handleActivePolicyToggle}>
                                        {this.props.value === 1 ? 
                                            <span className='selectIcon'></span> :
                                            <span className='unselectIcon'></span> }
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary version'>
                                    {this.renderMinMaxVersion()}
                                </div>
                                <div className='files-list__item-content-secondary'>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch 
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "int":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <input 
                                            type="number"
                                            className="win-textbox" 
                                            placeholder={this.props.data['PluginFlyvemdmPolicy.name']}
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={this.state.input}
                                            onChange={this.handleChangeInput}
                                            onBlur={this.handleBlurInput}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary version'>
                                    {this.renderMinMaxVersion()}
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch 
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "dropdown":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <select
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={this.props.value}
                                            onChange={this.handleChangeInput}>
                                            {
                                                this.props.typeData.map((value, index) =>
                                                    <option 
                                                        key={value[0]}
                                                        value={value[0]}>
                                                        {value[1]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary version'>
                                    {this.renderMinMaxVersion()}
                                </div>
                                <div className='files-list__item-content-secondary ' onClick={this.handleAddedToggle}>
                                    <div className='files-list__item-icon'>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "deployapp":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <select 
                                        name={this.props.data['PluginFlyvemdmPolicy.id']}
                                        value = {0} 
                                        onChange={this.handleChangeInput}>
                                            <option value={0}>
                                                {I18n.t('commons.select_an_application')}
                                            </option>
                                            {
                                                this.props.typeData.map((value, index) =>
                                                    <option
                                                        key={`${value['id']}_${index}`}
                                                        value={value['id']}>
                                                        {value["alias"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                        <TasksDeployAppList 
                                        data={this.props.value}
                                        typeData={this.props.typeData}
                                        removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary version'>
                                    {this.renderMinMaxVersion()}
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                    <ReactWinJS.ToggleSwitch 
                                        className="files-list__content-text-primary"
                                        checked={this.state.alreadyAdded}
                                        onChange={() => this.handleAddedToggle}
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "removeapp":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <input
                                            type="text"
                                            className="win-textbox"
                                            placeholder={I18n.t('commons.package_name')}
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={this.state.input}
                                            onChange={this.handleChangeInput}
                                        />
                                        <span
                                            className="addIcon"
                                            style={{ padding: '0 10px', fontSize: '18px' }}
                                            onClick={this.handleBlurInput}
                                        />
                                        <TasksRemoveAppList
                                            data={this.props.value}
                                            removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary version'>
                                    {this.renderMinMaxVersion()}
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "deployfile":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <select 
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={0}
                                            onChange={this.handleChangeInput}>
                                            <option value={0}>
                                                {I18n.t('commons.select_a_file')}
                                            </option>
                                            {
                                                this.props.typeData.map((value, index) =>
                                                    <option
                                                        key={`${value['id']}_${index}`}
                                                        value={value['id']}>
                                                        {value["name"]}
                                                    </option>
                                                )
                                            }
                                        </select>
                                        <TasksDeployFileList
                                            data={this.props.value}
                                            typeData={this.props.typeData}
                                            removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary version'>
                                    {this.renderMinMaxVersion()}
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                case "removefile":
                return (
                    <div className='files-list fleet-list'>
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {this.props.data['PluginFlyvemdmPolicy.name']}
                                    </div>
                                    <div className={`files-list__item-list-field ${this.state.alreadyAdded && 'files-list__item-list-field--active'}`} >
                                        <input
                                            type="text"
                                            className="win-textbox"
                                            placeholder={I18n.t('files.input_name')}
                                            name={this.props.data['PluginFlyvemdmPolicy.id']}
                                            value={this.state.input}
                                            onChange={this.handleChangeInput}
                                        />
                                        <span
                                            className="addIcon"
                                            style={{ padding: '0 10px', fontSize: '18px' }}
                                            onClick={this.handleBlurInput}
                                        />
                                        <TasksRemoveFileList
                                            data={this.props.value}
                                            removeTask={this.handleRemoveTask}
                                        />
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary version'>
                                    {this.renderMinMaxVersion()}
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon' onClick={this.handleAddedToggle}>
                                        <ReactWinJS.ToggleSwitch
                                            className="files-list__content-text-primary"
                                            checked={this.state.alreadyAdded}
                                            onChange={() => this.handleAddedToggle}
                                            labelOn=""
                                            labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                default:
                return (
                    <div className='files-list fleet-list' >
                        <div className='files-list__content'>
                            <div className='files-list__item'>
                                <div className={`files-list__item-content-primary ${this.state.alreadyAdded || 'files-list__item--deactive'}`}>
                                    <div className='files-list__content-text-primary'>
                                        {I18n.t('commons.not_available')}
                                    </div>
                                </div>
                                <div className='files-list__item-content-secondary '>
                                    <div className='files-list__item-icon'>
                                    <ReactWinJS.ToggleSwitch 
                                        className="files-list__content-text-primary"
                                        checked={false}
                                        disabled
                                        labelOn=""
                                        labelOff="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default FleetsTaskItemList