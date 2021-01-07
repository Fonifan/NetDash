import React, { useState } from 'react';
import {
	Link
} from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { DashboardTwoTone, StorageTwoTone, HomeTwoTone, ExpandLess, ExpandMore, Home } from '@material-ui/icons';
import { Collapse, ListItemIcon, ListItemText } from '@material-ui/core';

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
	},
	icon: {
		color: '#ffffff'
	}
});

function NavigationBar () {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<List className={classes.nav}>
			<ListItem button>
				<Link to='/' className={classes.linkContainer}>
					<ListItemIcon>
						<Home className={classes.icon}/>
					</ListItemIcon>
					<ListItemText primary='Home'/>
				</Link>
			</ListItem>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<DashboardTwoTone className={classes.icon}/>
				</ListItemIcon>
				<ListItemText primary='Dashboard' className={classes.linkContainer}/>
				{open ? <ExpandLess/> : <ExpandMore/>}
			</ListItem>

			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItem>
						<Link to='/dashboard/conversation' className={classes.linkContainer}>
							<ListItemText primary='Conversations'/>
						</Link>
					</ListItem>
				</List>
			</Collapse>

			<ListItem button>
				<Link to='/datasources' className={classes.linkContainer}>
					<ListItemIcon>
						<StorageTwoTone className={classes.icon}/>
					</ListItemIcon>
					<ListItemText primary='Datasources'/>
				</Link>
			</ListItem>
		</List>
	);
}

export default NavigationBar;
