import '../assets/style/art.scss';
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Index from '../pages/Index';
import Native from '../pages/Native';

const mainRouter = [
  {
    name: 'index',
    key: 'index',
    route: {
      path: '/index',
      component: Index,
    },
  },
  {
    name: 'native',
    key: 'native',
    route: {
      path: '/native',
      component: Native,
    },
  },
];

const routes = (
  <Switch>
    // @ts-ignore
    {mainRouter.map(route => <Route key={route.key} {...route.route} />)}
    <Redirect to="./index" />
  </Switch>
);

export default routes;
