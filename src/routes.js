import Dashboard from './components/dashboard/Dashboard'
import Users from './components/users/Users'
import User from './components/users/User'
import Promotions from './components/promotions/Promotions'
import Promotion from './components/promotions/Promotion'
import Products from './components/products/Products'
import ProductsAdd from './components/products/ProductsAdd'
import Product from "./components/products/Product";
import Categories from './components/categories/Categories'
import Category from './components/categories/Category'
import ShoppingLists from './components/shoppingLists/ShoppingLists'
import ShoppingList from './components/shoppingLists/ShoppingList'
import Preferences from "./components/preferences/Preferences";
import Preference from "./components/preferences/Preference";
import Permissions from "./components/permissions/Permissions";
import PromotionsAdd from './components/promotions/PromotionsAdd';
import Campaigns from "./components/campaigns/Campaigns";
import Campaign from "./components/campaigns/Campaign";
import Shops from "./components/shops/Shops";
import {Shop} from "./components/shops/Shop";
import Locales from "./components/locales/Locales";
import Locale from "./components/locales/Locale";

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/promotions', exact: true, name: 'Promotion', component: Promotions },
  { path: '/promotions/add', exact: true, name: 'Add Promotions', component: PromotionsAdd },
  { path: '/promotions/:id', exact: true, name: 'Promotion Details', component: Promotion },
  { path: '/products', exact: true, name: 'Products', component: Products },
  { path: '/products/add', exact: true, name: 'Add Products', component: ProductsAdd },
  { path: '/products/:id', exact: true, name: 'Products', component: Product },
  { path: '/categories', exact: true, name: 'Categories', component: Categories },
  { path: '/categories/:id', exact: true, name: 'Category', component: Category },
  { path: '/shoppingLists', exact: true, name: 'Shopping Lists', component: ShoppingLists },
  { path: '/shoppingLists/:id', exact: true, name: 'Shopping List', component: ShoppingList },
  { path: '/preferences', exact: true, name: 'Preferences List', component: Preferences },
  { path: '/preferences/:id', exact: true, name: 'Preference', component: Preference },
  { path: '/permissions', exact: true, name: 'Permissions', component: Permissions },
  { path: '/campaigns', exact: true, name: 'Campaigns', component: Campaigns },
  { path: '/campaigns/:id', exact: true, name: 'Campaign', component: Campaign },
  { path: '/shops', exact: true, name: 'Shops', component: Shops },
  { path: '/shops/:id', exact: true, name: 'Shop', component: Shop },
  { path: '/locales', exact: true, name: 'Locales', component: Locales },
  { path: '/locales/:id', exact: true, name: 'Locale', component: Locale },
];

export default routes;
