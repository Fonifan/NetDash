import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

function HomePresenter () {
	const classes = useStyles();
	return (
		<div className={classes.content}>
			<h1>NetDash</h1>
			<p>For dashboard click &quot;Dashboard&quot;</p>
			<p>For operations with datasources click &quot;Datasources&quot;</p>
		</div>);
}

export default HomePresenter;
