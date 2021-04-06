import React, { useState } from 'react';
import {
	Link as ReachLink
} from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { List, ListItem, Link, Button, Collapse, Box } from '@chakra-ui/react';

const useStyles = createUseStyles({
	nav: {
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#292929',
		minWidth: '220px'
	},
	linkContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		textDecoration: 'none',
		padding: '10px',
		color: '#ffffff'
	},
	linkText: {
		padding: '0px 0px 0px 5px'
	},
	icon: {
		color: '#ffffff'
	},
	dashboardContainer: {
		padding: '10px',
		backgroundColor: '#3C3C3C'
	}
});

function NavigationBar () {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<List className={classes.nav}>
			<ListItem className={classes.linkContainer}>
				<Link as={ReachLink} to='/'>
					Home
				</Link>
			</ListItem>
			<ListItem className={classes.linkContainer}>
				<Button
					color='white'
					onClick={handleClick}
					variant='link'>
					Dashboards
				</Button>
			</ListItem>

			<Collapse in={open} unmountOnExit>
				<Box className={classes.dashboardContainer}>
					<List>
						<ListItem className={classes.linkContainer}>
							<Link as={ReachLink} to='/dashboard/conversation'>
								Conversations
							</Link>
						</ListItem>
						<ListItem className={classes.linkContainer}>
							<Link as={ReachLink} to='/dashboard/file'>
								File
							</Link>
						</ListItem>
						<ListItem className={classes.linkContainer}>
							<Link as={ReachLink} to='/dashboard/encrypted'>
								Encrypted Traffic
							</Link>
						</ListItem>
						<ListItem className={classes.linkContainer}>
							<Link as={ReachLink} to='/dashboard/domain'>
								Resolved Domains
							</Link>
						</ListItem>
					</List>
				</Box>
			</Collapse>

			<ListItem className={classes.linkContainer}>
				<Link as={ReachLink} to='/datasources'>
					Datasources
				</Link>
			</ListItem>
		</List>
	);
}

export default NavigationBar;
