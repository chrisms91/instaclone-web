import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { isLoggedInVar, isDarkModeVar, client } from './apollo';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import SignUp from './screens/SignUp';
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Profile from './screens/Profile';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(isDarkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <div>
            <Router>
              <Switch>
                <Route path={routes.home} exact>
                  {isLoggedIn ? (
                    <Layout>
                      <Home />
                    </Layout>
                  ) : (
                    <Login />
                  )}
                </Route>
                {!isLoggedIn ? (
                  <Route path={routes.signUp}>
                    <SignUp />
                  </Route>
                ) : null}
                <Route path={`/users/:userName`}>
                  <Layout>
                    <Profile />
                  </Layout>
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Router>
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
