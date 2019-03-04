import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import routes from './routes/index';

const env = process.env.NODE_ENV || 'development';

interface NodeModule {
  hot: any,
  exports: any;
  require: NodeRequireFunction;
  id: string;
  filename: string;
  loaded: boolean;
  parent: NodeModule | null;
  children: NodeModule[];
  paths: string[];
}

declare var module: NodeModule;

const RootApp = () => {
  return (
    <Router>
      {routes}
    </Router>
  );
};

// Render the main component into the dom
if (env === 'development') {
  window.onload = function () {
    const render = (Component: any) => {
      ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('app')
      );
    };
    render(RootApp);
    if (module.hot) {
      module.hot.accept('./routes', () => {
        render(RootApp);
      });
    }
  };
} else {
  window.onload = function () {
    ReactDOM.render(
      <RootApp />,
      document.getElementById('app')
    );
  };
}
