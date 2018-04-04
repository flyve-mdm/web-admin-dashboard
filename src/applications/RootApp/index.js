import React, { Component } from 'react'
import { Switch } from 'react-router-dom'

// TODO: import PrivateRoute from '../../components/PrivateRoute'

import withI18NTranslation from '../../hoc/withI18NTranslation'
import withNotification from '../../hoc/withNotification'
import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes'

/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 * TODO: Use PrivateRoute if the `private attribute of route is true
 */
class RootApp extends Component {
  render () {
    const rootPath = window.location.pathname.split('/')[1]
    return (
      <Switch>
        <GenerateRoutes routes={routes} rootPath={rootPath} withNotFound />
      </Switch>    
    )
  }
}

export default withNotification(
  withI18NTranslation(RootApp)
)