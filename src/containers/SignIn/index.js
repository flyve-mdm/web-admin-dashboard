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
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UsernameFieldset from './components/UsernameFieldset'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import { fetchSignIn } from '../../store/authentication/actions'
import { I18n } from 'react-i18nify'
import publicURL from '../../shared/publicURL'
// Async Component
import AsyncPasswordFieldset from '../../async/asyncPasswordFielset'
import { Redirect } from 'react-router'
import Loading from '../../components/Loading'
import { changeInput, changePhase, handleFormSubmit } from './actions'
import { slideLeft, slideRight } from '../../shared/animations/index'

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        fetchSignIn: bindActionCreators(fetchSignIn, dispatch)
    }
    return { actions }
}

/**
 * Component with the login form
 * @class SignIn
 * @extends PureComponent
 */
class SignIn extends PureComponent {
    /** @constructor */
    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            phase: 1
        }
    }
    
    /**
     * Handle change input value
     * @function changeInput
     * @param {} event
     */
    changeInput = event => changeInput(this, event.target)
    
    /**
     * Handle change phase
     * @function changePhase
     * @param {number} newPhase
     */
    changePhase = newPhase => changePhase(this, newPhase)
    
    /**
     * Handle form submit
     * @function handleFormSubmit
     * @param {object} event
     */
    handleFormSubmit = event => handleFormSubmit(this, event)
    
    /**
     * Play slide animation
     * @function componentDidUpdate
     * @param {object} prevProds 
     * @param {object} prevState 
     */
    componentDidUpdate (prevProds, prevState) {
        if (prevState.phase !== this.state.phase) {
            if (this.state.phase === 2 && this.form) {
                slideLeft(this.form).play()
            }
            if (this.state.phase === 1 && this.form) {
                slideRight(this.form).play()
            }
        }
    }

    /** 
     * Render component 
     * @function render
     */ 
    render () {
        if (localStorage.getItem('currentUser') && localStorage.getItem('sessionToken')) {
            return <Redirect to={`${publicURL}/app`}/>
        } else {
            let form
            if (this.state.phase === 1) {
                form = (
                    <UsernameFieldset
                        username={this.state.username} 
                        changeInput={this.changeInput}
                        changePhase={this.changePhase}
                    />  
                )  
            } else {
                form = (
                    <AsyncPasswordFieldset
                        username={this.state.username}
                        password={this.state.password}
                        changeInput={this.changeInput}
                        changePhase={this.changePhase}
                        history={this.props.history}
                        handleOnSubmit={this.handleFormSubmit}
                    />
                )
            }
            return this.props.isLoading ? 
                <div style={{ height: '140px' }}><Loading message={`${I18n.t('commons.loading')}...`} /></div> : 
                    <div ref={element => this.form = element}>{form}</div> 
        }
    }
}

SignIn.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthenticationLayout(withHandleMessages(SignIn), { centerContent: true }))