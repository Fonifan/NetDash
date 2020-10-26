import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { createUseStyles } from 'react-jss';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const useStyles = createUseStyles({
	form: {
		display: 'flex',
		flexDirection: 'column',
		padding: '20px'
	},
	select: {
		marginTop: '20px'
	},
	credentials: {
		display: 'flex'
	}
});

function NewDatasourceDialog (props) {
	const classes = useStyles();

	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}>
			<DialogTitle>Add new datasource</DialogTitle>
			<form className={classes.form} noValidate autoComplete='off'>
				<TextField id='name' label='Name'/>
				<div className={classes.credentials}>
					<TextField id='username' label='Username'/>
					<TextField id='password' type='password' label='Password'/>
				</div>
				<TextField id='url' label='Url'/>
				<div className={classes.select}>
					<InputLabel id='type'>Datasource Type</InputLabel>
					<Select labelId='type' id='type' label='Type' defaultValue='postgresql'>
						<MenuItem value='postgresql'>PostgreSQL</MenuItem>
						<MenuItem value='mysql'>MySQL</MenuItem>
					</Select>
				</div>
			</form>
			<Button>
				Submit
			</Button>
		</Dialog>);
}

export default NewDatasourceDialog;
