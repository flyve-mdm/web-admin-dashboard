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

import I18n from '../../shared/i18n'
import EmptyMessage from '../../components/EmptyMessage'
import ErrorPage from '../../components/ErrorPage'
import DevicesContent from './components/DevicesContent'
import Enroll from './components/Enroll'
import DevicesEditOne from './components/DevicesEditOne'
import DevicesEdit from './components/DevicesEdit'

/**
 * Represents all routes from Devices section
 * @constant
 * @type {Array}
 */
const routes = [{
  path: '/',
  name: I18n.t('commons.no_selection'),
  component: EmptyMessage,
  exact: true,
},
{
  path: '/error',
  name: I18n.t('commons.error'),
  component: ErrorPage,
  exact: true,
},
{
  path: '/add',
  name: I18n.t('commons.add'),
  component: Enroll,
  exact: true,
},
{
  path: '/edit',
  name: I18n.t('commons.edit'),
  component: DevicesEdit,
  exact: true,
},
{
  path: '/:id/edit',
  name: I18n.t('commons.edit_one'),
  component: DevicesEditOne,
  exact: true,
},
{
  path: '/:id',
  name: I18n.t('commons.selected'),
  component: DevicesContent,
  exact: false,
},
]

export default routes
