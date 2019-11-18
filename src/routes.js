import Dashboard from './components/dashboard/Dashboard'
import Users from './components/users/Users'
import User from './components/users/User'
import Promotions from './components/promotions/Promotions'
import Promotion from './components/promotions/Promotion'
import Products from './components/products/Products'
import Product from "./components/products/Product";
import Categories from './components/categories/Categories'
import ShoppingLists from './components/shoppingLists/ShoppingLists'
import ShoppingList from './components/shoppingLists/ShoppingList'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/promotions', exact: true, name: 'Promotion', component: Promotions },
  { path: '/promotions/:id', exact: true, name: 'Promotion Details', component: Promotion },
  { path: '/products', exact: true, name: 'Products', component: Products },
  { path: '/products/:id', exact: true, name: 'Products', component: Product },
  { path: '/categories', exact: true, name: 'Categories', component: Categories },
  { path: '/shoppingLists', exact: true, name: 'Shopping Lists', component: ShoppingLists },
  { path: '/shoppingLists/:id', exact: true, name: 'Shopping List', component: ShoppingList },

];

export default routes;
