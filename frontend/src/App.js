import React from 'react';
import './App.css';
import { createUseStyles } from 'react-jss';
import {
  Switch,
  Route,
  BrowserRouter as Router,

} from 'react-router-dom';
import NavigationBar from './navigation/NavigationBar';
import DatasourcePresenter from './datasources/DatasourcePresenter';
import HomePresenter from './home/HomePresenter';
import ConversationDashboard from './dashboard/conversation/ConverastionDashboard';

const useStyles = createUseStyles({
  app: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  navBar: {
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Router>
        <NavigationBar className={classes.navBar} />
        <Switch>
          <Route path='/datasources'>
            <DatasourcePresenter />
          </Route>
          <Route path='/dashboard/conversation'>
            <ConversationDashboard />
          </Route>
          <Route path='/'>
            <HomePresenter />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
