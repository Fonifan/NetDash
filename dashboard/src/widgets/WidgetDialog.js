import React from 'react';
import { createUseStyles } from 'react-jss';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import { Widgets } from './WidgetFactory';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = createUseStyles({
	modal: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	list: {
		width: '100%',
		maxWidth: 360
	}
});

function WidgetDialog (props) {
	const classes = useStyles();

	if (!props.selectedCell) { return null; }

	const { col, row } = props.selectedCell;
	const listItems = [];
	Object.keys(Widgets).forEach((key) => {
		const { name } = Widgets[key];
		listItems.push(
			<ListItem button
				onClick={() => {
					props.handleWidgetSelect(col, row, key);
					props.onClose();
				}}
				key={key}>
				<ListItemText>{name}</ListItemText>
			</ListItem>
		);
	});

	return (
		<Dialog open={props.open}
			onClose={props.onClose}
			disableEnforceFocus>
			<DialogTitle>Select Widget</DialogTitle>
			<List className={classes.list}>
				{listItems}
			</List>
		</Dialog>);
}

export default WidgetDialog;
