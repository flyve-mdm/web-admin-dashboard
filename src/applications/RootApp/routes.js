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
import publicURL from 'shared/publicURL'
import withAsyncComponent from 'hoc/withAsyncComponent'

/**
 * Represents all public routes
 * @constant routes
 * @type {array}
 */
const routes = [{
  path: `${publicURL}/`,
  component: withAsyncComponent(() => import('containers/SignIn')),
  exact: true,
  private: false,
},
{
  path: `${publicURL}/signUp`,
  component: withAsyncComponent(() => import('containers/SignUp')),
  exact: false,
  private: false,
},
{
  path: `${publicURL}/validateAccount`,
  component: withAsyncComponent(() => import('components/ValidateAccount')),
  exact: false,
  private: false,
},
{
  path: `${publicURL}/forgotPassword`,
  component: withAsyncComponent(() => import('containers/ForgotPassword')),
  exact: false,
  private: false,
},
{
  path: `${publicURL}/resetPassword`,
  component: withAsyncComponent(() => import('containers/ResetPassword')),
  exact: false,
  private: false,
},
{
  path: `${publicURL}/app`,
  component: withAsyncComponent(() => import('applications/AdminDashboard')),
  exact: false,
  private: false,
},
]

export default routes
