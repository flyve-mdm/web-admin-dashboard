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

import EmptyMessage from '../../components/EmptyMessage'
import Entity from './components/Entity'
import Profiles from './components/Profiles'
import Supervision from './components/Supervision'
import Security from './components/Security'
import Notifications from './components/Notifications'
import Display from './components/Display'
import { I18n } from 'react-i18nify'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/entity',
    name: I18n.t('commons.entity'),
    component: Entity,
    exact: true
  },
  {
    path: '/profiles',
    name: I18n.t('commons.profiles'),
    component: Profiles,
    exact: false
  },
  {
    path: '/supervision',
    name: I18n.t('commons.supervision'),
    component: Supervision,
    exact: false
  },
  {
    path: '/security',
    name: I18n.t('commons.security'),
    component: Security,
    exact: false
  },
  {
    path: '/notifications',
    name: I18n.t('commons.notifications'),
    component: Notifications,
    exact: false
  },
  {
    path: '/display',
    name: I18n.t('commons.display'),
    component: Display,
    exact: false
  }
]

export default routes