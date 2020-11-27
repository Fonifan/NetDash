import React from 'react';
import './App.css';
import { Dashboard } from './dashboard/Dashboard';
import { createUseStyles } from 'react-jss';
import {
	Switch,
	Route,
	BrowserRouter as Router

} from 'react-router-dom';
import NavigationBar from './navigation/NavigationBar';
import DatasourcePresenter from './datasources/DatasourcePresenter';
import HousePresenter from './house/HousePresenter';

const useStyles = createUseStyles({
	app: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap'
	},
	content: {
		flexGrow: 9,
		padding: '10px',
		height: '95vh',
		width: '100%'
	},
	navBar: {
		flexGrow: 1
	}
});

function App () {
	const classes = useStyles();
	return (
		<div className={classes.app}>
			<Router>
				<NavigationBar className={classes.navBar}/>

				<div className={classes.content}>
					<Switch>
						<Route path='/datasources'>
							<DatasourcePresenter/>
						</Route>
						<Route path='/dashboard'>
							<Dashboard/>
						</Route>
						<Route path='/'>
							<HousePresenter/>
						</Route>
					</Switch>
				</div>
			</Router>
		</div>

	);
}

export default App;
