import '../assets/style/art.less';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Index from '../pages/Index';
import Native from '../pages/Native';
import MapBox from '../pages/MapBox';
import Openlayers from '../pages/Openlayers';

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
  {
    name: 'mapbox',
    key: 'mapbox',
    route: {
      path: '/mapbox',
      component: MapBox,
    },
  },
  {
    name: 'openlayers',
    key: 'openlayers',
    route: {
      path: '/openlayers',
      component: Openlayers,
    },
  },
];

const routes = (
  <Switch>
    // @ts-ignore
    {mainRouter.map(route => <Route key={route.key} {...route.route} />)}
    <Redirect to="./mapbox" />
  </Switch>
);

export default routes;
