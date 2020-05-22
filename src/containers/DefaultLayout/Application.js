import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import DefaultHeader from './DefaultHeader';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import authenticationService from '../../services/authenticationService';
import ModalExtended from '../../components/modal/Modal';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...super.state,
      modal: false
    }
  }
  toggle = () => {
    if (this.props.dialogShown) {
      this.props.dialogClose();
    } else {
      this.props.dialogOpen();
    }
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    authenticationService.logout();
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/promotions" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              {/* <DefaultAside /> */}
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            {/* <DefaultFooter /> */}
          </Suspense>
        </AppFooter>
        <Button onClick={this.toggle}>Click me</Button>
        <ModalExtended dialog="ProductModal"></ModalExtended>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dialogOpen: () => dispatch({ type: 'DIALOG_OPEN', payload: {
      type: 'ProductModal',
      params: {
        name: 'GOSHO'
      }
    } }),
    dialogClose: () => dispatch({ type: 'DIALOG_CLOSE', payload: {}})
  }
};

export default connect(null, mapDispatchToProps)(Application);
