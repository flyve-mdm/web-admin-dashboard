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

import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import withGLPI from '../../hoc/withGLPI'
import { uiSetNotification } from '../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import publicURL from '../../shared/publicURL'
import itemtype from '../../shared/itemtype'
import { I18n } from "react-i18nify"
import Loading from '../../components/Loading'
import appConfig from '../../../public/config.json'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class ValidateAccount extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isValidated: false,
            isLoading: false
        }
    }

    componentDidMount() {

        let path = this.props.location.pathname.replace("/validateAccount/", "&validateAccount=")
        path = path.replace("/validation/", "&validation=")
        const params = new URLSearchParams(path)
        const account = params.get('validateAccount')
        const validation = params.get('validation')

        if (account && validation) {
            this.setState({ isLoading: true })
            this.requestValidation(account, validation)
        }
    }

    requestValidation = async (account, validation) => {
        try {
            const session = await this.props.glpi.initSessionByUserToken({ userToken: appConfig.demoToken })
            this.props.glpi.sessionToken = session.session_token
            const response = await this.props.glpi.updateItem({ itemtype: itemtype.PluginFlyvemdmdemoAccountvalidation, id: account, input: { _validate: validation } })
            let isValidated = false
            
            if (Array.isArray(response)) {
                for (let item of response) {
                    if (item[account]) {
                        isValidated = true
                        break
                    }
                }
            }
            
            this.setState({ isLoading: false, isValidated })

        } catch (error) {
            this.props.actions.setNotification(this.props.handleMessage({type: 'warning', message: error}))
            this.setState({ isLoading: false, isValidated: false })
        }
        
    }

    render() {
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = <div style={{ height: '140px' }}><Loading message={`${I18n.t('commons.loading')}...`} /></div>
        } else {
            if (this.state.isValidated) {
                renderComponent = (
                    <React.Fragment>
                        <h2>
                            {I18n.t('validate_account.title')}
                        </h2>
                        <p>
                            {I18n.t('validate_account.is_validated')}
                            <br />
                        </p>
                        <p>
                            <Link to={`${publicURL}/`}>{I18n.t('commons.sign_in')}</Link>
                        </p>
                    </React.Fragment>
                )

            } else {
                renderComponent = (
                    <React.Fragment>
                        <h2>
                            {I18n.t('validate_account.title')}
                        </h2>
                        <p>
                            {I18n.t('validate_account.message')}
                            <br />
                        </p>
                    </React.Fragment>
                )
            }
        }

        return renderComponent
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withAuthenticationLayout(withGLPI(withHandleMessages(ValidateAccount)), {
    centerContent: true
}))