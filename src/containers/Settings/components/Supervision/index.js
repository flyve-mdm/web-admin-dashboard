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
import {
  supervisionScheme
} from '../../../../components/Forms/Schemas'
import validateData from '../../../../shared/validateData'
import ConstructInputs from '../../../../components/Forms'
import {
  bindActionCreators
} from 'redux'
import {
  uiSetNotification
} from '../../../../store/ui/actions'
import {
  connect
} from 'react-redux'
import ContentPane from '../../../../components/ContentPane'
import {
  I18n
} from 'react-i18nify'
import Loading from '../../../../components/Loading'
import withGLPI from '../../../../hoc/withGLPI'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import itemtype from '../../../../shared/itemtype'

function mapDispatchToProps(dispatch) {
  const actions = {
    setNotification: bindActionCreators(uiSetNotification, dispatch)
  }
  return {
    actions
  }
}

/**
 * Component with the supervision section
 * @class Supervision
 * @extends PureComponent
 */
class Supervision extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      website: '',
      email: '',
      address: '',
      entityID: '',
      isLoading: true
    }
  }

  /**
   * Save the new values in glpi
   * @function saveChanges
   */
  saveChanges = () => {
    this.setState({
      isLoading: true
    }, async () => {
      try {
        await this.props.glpi.updateItem({
          itemtype: itemtype.Entity,
          id: `${this.state.entityID}`,
          input: {
            name: this.state.name,
            phonenumber: this.state.phone,
            website: this.state.website,
            email: this.state.email,
            address: this.state.address
          }
        })
        this.setState({
          isLoading: false
        })
        this.props.actions.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.helpdesk_configuration_saved'),
          type: 'success'
        })
      } catch (error) {
        this.props.actions.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error
        }))
        this.setState({
          isLoading: false
        })
      }
    })
  }

  /**
   * Handle set state
   * @function changeState
   * @param {string} name
   * @param {string} value
   */
  changeState = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  /**
   * Get the supervision information from glpi
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const {
        active_profile
      } = await this.props.glpi.getActiveProfile()
      let entityID
      if (Array.isArray(active_profile.entities)) {
        entityID = active_profile.entities[0].id
      } else {
        for (const key in active_profile.entities) {
          if (active_profile.entities.hasOwnProperty(key)) {
            entityID = active_profile.entities[key].id
          }
        }
      }
      const entity = await this.props.glpi.getAnItem({
        itemtype: itemtype.Entity,
        id: entityID
      })
      this.setState({
        isLoading: false,
        entityID,
        name: validateData(entity.name),
        phone: validateData(entity.phonenumber),
        website: validateData(entity.website),
        email: validateData(entity.email),
        address: validateData(entity.address)
      })
    } catch (error) {
      this.props.actions.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error
      }))
      this.setState({
        isLoading: false
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const supervision = supervisionScheme({
      state: this.state,
      changeState: this.changeState
    })

    return (
      this.state.isLoading ?
        <Loading message={`${I18n.t('commons.loading')}...`}/>
        : (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('settings.supervision.title')}
            </h2>
            <div className="list-content" style={{ margin: '10px' }}>
              <ConstructInputs
                data={supervision.helpDeskInformation}
                icon="supervisionIcon"
                title={I18n.t('settings.supervision.helpdesk')}
              />
              <div style={{overflow: 'auto', paddingBottom: 40}}>
                <button
                  className="btn btn--primary"
                  style={{ marginRight: "20px", float: "right" }}
                  onClick={this.saveChanges}
                >
                  {I18n.t('commons.save')}
                </button>
              </div>
            </div>
          </ContentPane>
        )
    )
  }
}

Supervision.propTypes = {
  actions: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(withGLPI(withHandleMessages(Supervision)))
