import FleetsContent from './components/FleetsContent'
import EmptyMessage from '../../components/EmptyMessage'

const routes = [
  {
    path: '/',
    name: 'No selected',
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/:id',
    name: 'Fleet',
    component: FleetsContent,
    exact: false
  },
  {
    path: '/add',
    name: 'Add Fleet',
    component: FleetsContent,
    exact: false
  }
]

export default routes