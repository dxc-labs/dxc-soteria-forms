/* eslint-disable require-jsdoc */
import React from 'react';
import {CookiesProvider} from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {routes} from './global/routes';
import AppStateProvider from './AppStateProvider';

function App() {
  return (
    <AppStateProvider>
      <CookiesProvider>
        <div className="App">
          <Router>
            <Switch>
              {Object.keys(routes).map((key, i) => (
                <Route
                  key={i}
                  path={routes[key].path}
                  component={routes[key].component}
                />
              ))}
              <Redirect to="/forms" />
            </Switch>
          </Router>
        </div>
      </CookiesProvider>
    </AppStateProvider>
  );
}

export default App;
