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
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import I18n from '../../shared/i18n'
import {
  Redirect,
} from 'react-router'
import UsernameFieldset from './components/UsernameFieldset'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import publicURL from '../../shared/publicURL'
// Async Component
import AsyncPasswordFieldset from '../../async/asyncPasswordFielset'
import Loading from '../../components/Loading'
import {
  changeInput,
  changePhase,
  handleFormSubmit,
} from './actions'
import {
  slideLeft,
  slideRight,
} from '../../shared/animations/index'

/**
 * Component with the login form
 * @class SignIn
 * @extends PureComponent
 */
class SignIn extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      phase: 1,
    }

    /**
     * Implementation of Credential Management API
     * to obtain the access data of the saved user
     * and load them automatically in the form.
     *
     * Ref: https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get
     */
    try {
      navigator.credentials.get({
        password: true,
        mediation: 'optional',
      })
        .then(res => {
          if (res) {
            this.setState({
              username: res.name,
              password: res.password,
            })
          }
        })
    } catch (error) {}
  }

  /**
   * Play slide animation
   * @function componentDidUpdate
   * @param {object} prevProds
   * @param {object} prevState
   */
  componentDidUpdate(...args) {
    const { phase } = this.state
    const prevState = args[1]

    if (prevState.phase !== phase) {
      if (phase === 2 && this.form) {
        slideLeft(this.form).play()
      }
      if (phase === 1 && this.form) {
        slideRight(this.form).play()
      }
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
   * Render component
   * @function render
   */
  render() {
    const {
      phase,
      username,
      password,
    } = this.state
    const {
      history,
    } = this.props

    if (localStorage.getItem('currentUser') && localStorage.getItem('sessionToken')) {
      return <Redirect to={`${publicURL}/app`} />
    }
    let form
    if (phase === 1) {
      form = (
        <UsernameFieldset
          {...this.props}
          username={username}
          changeInput={this.changeInput}
          changePhase={this.changePhase}
        />
      )
    } else {
      form = (
        <AsyncPasswordFieldset
          {...this.props}
          username={username}
          password={password}
          changeInput={this.changeInput}
          changePhase={this.changePhase}
          history={history}
          handleOnSubmit={this.handleFormSubmit}
        />
      )
    }
    return this.props.auth.isLoading
      ? (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
      : (
        <div ref={(element) => { this.form = element }}>
          {form}
        </div>
      )
  }
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withAuthenticationLayout(withHandleMessages(SignIn), {
  centerContent: true,
})
