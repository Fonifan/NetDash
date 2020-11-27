import React from 'react';
import { createUseStyles } from 'react-jss';
import { IconButton } from '@material-ui/core';
import { DeleteTwoTone, EditTwoTone } from '@material-ui/icons';

const useStyles = createUseStyles({
	presenter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	},
	buttons: {
		display: 'flex'
	},
	content: {
		display: 'flex',
		flexDirection: 'column'
	}
});

function DatasourceItemPresenter (props) {
	const { name, type } = props;
	const classes = useStyles();
	return (
		<div className={classes.presenter}>
			<div className={classes.content}>
				<h2>{name}</h2>
				<p>{type}</p>
			</div>
			<div className={classes.buttons} >
				<IconButton>
					<EditTwoTone/>
				</IconButton>
				<IconButton>
					<DeleteTwoTone/>
				</IconButton>
			</div>
		</div>);
}

export default DatasourceItemPresenter;
