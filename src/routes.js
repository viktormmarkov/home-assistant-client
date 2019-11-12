import Dashboard from './components/dashboard/Dashboard'
import Users from './components/users/Users'
import User from './components/users/User'
import Promotions from './components/promotions/Promotions'
import Promotion from './components/promotions/Promotion'
import Products from './components/products/Products'
import Categories from './components/categories/Categories'
import ProductLists from './components/productLists/ProductLists'
import ProductList from './components/productLists/ProductList'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/promotions', exact: true, name: 'Promotion', component: Promotions },
  { path: '/promotions/:id', exact: true, name: 'Promotion Details', component: Promotion },
  { path: '/products', exact: true, name: 'Products', component: Products },
  { path: '/categories', exact: true, name: 'Categories', component: Categories },
  { path: '/productLists', exact: true, name: 'Shopping Lists', component: ProductLists },
  { path: '/productLists/:id', exact: true, name: 'Shopping List', component: ProductList },

];

export default routes;
