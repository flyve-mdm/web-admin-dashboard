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
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import {
  I18n
} from "react-i18nify"
import itemtype from '../../../shared/itemtype'

/**
 * @class Enroll
 * @extends PureComponent
 */
export default class Enroll extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      email: ''
    }
  }

  /**
   * handle send invitation to enroll device
   * @async
   * @function inviteDevice
   */
  inviteDevice = async () => {
    try {
      if (this.state.email.trim() !== "") {

        this.setState({
          isLoading: true
        })

        await this.props.glpi.addItem({
          itemtype: itemtype.PluginFlyvemdmInvitation,
          input: {
            _useremails: this.state.email.trim()
          }
        })

        this.setState({
          isLoading: false
        })

        this.props.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.invitation_successfully_sent'),
          type: 'success'
        })
        this.props.history.goBack()
        this.props.changeAction('reload')
      }
    } catch (error) {
      this.props.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error
      }))
      this.setState({
        isLoading: false
      })
    }
  }

  /**
   * handle change input value
   * @function changeInput
   * @param {object} e
   */
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let renderComponent
    if (this.state.isLoading) {
      renderComponent = (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    } else {
      renderComponent = (
        <ContentPane>
          <div className="content-header" style={{ margin: '0 10px' }}>
            <h2 className="content-header__title">
              {I18n.t('devices.enroll.title')}
            </h2>
          </div>
          <p>
            {I18n.t('devices.enroll.insert_active_email')}
          </p>
          <p>
            {I18n.t('devices.enroll.email_with_qr')}
          </p>
          <input
            type="email"
            className="win-textbox"
            placeholder={I18n.t('commons.email')}
            name="email"
            value={this.state.email}
            onChange={this.changeInput}
            required
          />
          <br />
          <button className="btn btn--secondary" onClick={() => this.props.history.goBack()}>
            {I18n.t('commons.cancel')}
          </button>
          <button
            className="btn btn--primary"
            style={{ marginLeft: 10 }}
            onClick={this.inviteDevice}
          >
            {I18n.t('commons.save')}
          </button>
        </ContentPane>
      )
    }

    return renderComponent
  }
}
/** Enroll propTypes */
Enroll.propTypes = {
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired
}
