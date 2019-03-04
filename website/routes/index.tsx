import '../assets/style/art.scss';
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Index from '../pages/Index';
import Points from '../pages/Points';
import LineString from '../pages/LineString';
import Polygon from '../pages/Polygon';

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
    name: 'points',
    key: 'points',
    route: {
      path: '/points',
      component: Points,
    },
  },
  {
    name: 'LineString',
    key: 'LineString',
    route: {
      path: '/LineString',
      component: LineString,
    },
  },
  {
    name: 'Polygon',
    key: 'Polygon',
    route: {
      path: '/Polygon',
      component: Polygon,
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
