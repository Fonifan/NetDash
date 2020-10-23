import React from 'react';
import './App.css';
import { Dashboard } from './dashboard/Dashboard';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	app: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap'
	},
	dashboard: {
		flexGrow: 5
	},
	sidebar: {
		flexGrow: 1
	}
});

function App () {
	const classes = useStyles();
	return (
		<div className={classes.app}>
			<Dashboard className={classes.dashboard}/>
		</div>

	);
}

export default App;
