import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
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
	const [name, setName] = useState();
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const [url, setUrl] = useState();
	const [type, setType] = useState('postgresql');
	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}>
			<DialogTitle>Add new datasource</DialogTitle>
			<form className={classes.form} noValidate autoComplete='off'>
				<TextField
					id='name'
					label='Name'
					value={name}
					onChange={(event) => setName(event.target.value)}/>
				<div className={classes.credentials}>
					<TextField
						id='username'
						label='Username'
						value={userName}
						onChange={(event) => setUserName(event.target.value)}/>
					<TextField
						id='password'
						type='password'
						label='Password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}/>
				</div>
				<TextField
					id='url'
					label='Url'
					value={url}
					onChange={(event) => setUrl(event.target.value)}/>
				<div className={classes.select}>
					<InputLabel id='type'>Datasource Type</InputLabel>
					<Select
						labelId='type'
						id='type'
						label='Type'
						value={type}
						onChange={(event) => setType(event.target.value)}>
						<MenuItem value='postgresql'>PostgreSQL</MenuItem>
						<MenuItem value='mysql'>MySQL</MenuItem>
					</Select>
				</div>
			</form>
			<Button onClick={() => {
				props.onSubmit({
					name,
					userName,
					password,
					url,
					type
				});
				props.onClose();
			}}>
				Submit
			</Button>
		</Dialog>);
}

export default NewDatasourceDialog;
