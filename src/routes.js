import Dashboard from './components/dashboard/Dashboard'
import Users from './components/users/Users'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users }
];

export default routes;
