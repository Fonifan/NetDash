import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%'
	},
	text: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	}
});

function HomePresenter () {
	const classes = useStyles();
	return (
		<div className={classes.content}>
			<div className={classes.text}>
			<h1>NetDash</h1>
			<p>For dashboard click &quot;Dashboard&quot;</p>
			<p>For operations with datasources click &quot;Datasources&quot;</p>
			</div>
		</div>);
}

export default HomePresenter;
