import React from 'react';
import {
	Link
} from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { DashboardTwoTone, StorageTwoTone, HomeTwoTone } from '@material-ui/icons';

const useStyles = createUseStyles({
	nav: {
		padding: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#292929'
	},
	linkContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		textDecoration: 'none',
		color: '#ffffff'
	},
	linkText: {
		padding: '0px 0px 0px 5px'
	}
});

function NavigationBar () {
	const classes = useStyles();
	const links = {
		home: {
			icon: <HomeTwoTone/>,
			text: 'Home',
			path: '/'
		},
		dashboard: {
			icon: <DashboardTwoTone/>,
			text: 'Dashboard',
			path: '/dashboard'
		},
		datasources: {
			icon: <StorageTwoTone/>,
			text: 'Datasources',
			path: '/datasources'
		}
	};
	return (
		<List className={classes.nav}>
			{Object.keys(links).map(key => {
				const link = links[key];

				return (
					<ListItem button key={key}>
						<Link to={link.path} className={classes.linkContainer}>
							{link.icon}
							<p className={classes.linkText}>{link.text}</p>
						</Link>
					</ListItem>);
			})}
		</List>
	);
}

export default NavigationBar;
