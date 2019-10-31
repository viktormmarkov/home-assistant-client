import Dashboard from './components/dashboard/Dashboard'
import Users from './components/users/Users'
import User from './components/users/User'
import Promotions from './components/promotions/Promotions'
import Promotion from './components/promotions/Promotion'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/promotions', exact: true, name: 'Promotion', component: Promotions },
  { path: '/promotions/:id', exact: true, name: 'Promotion Details', component: Promotion }
];

export default routes;
