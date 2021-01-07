import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Button from '@material-ui/core/Button';
import AddPcapForm from './AddPcapForm';

const useStyles = createUseStyles({
	form: {
		padding: 20
	}
});

function NewDatasourceDialog (props) {
	const classes = useStyles();
	const [datasource, setDatasource] = useState({});

	const onUpdateDatasource = (name, property) => {
		datasource[name] = property;
	};

	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}>
			<DialogTitle>Add new datasource</DialogTitle>
			<div className={classes.form}>
				<AddPcapForm onUpdateDatasource={onUpdateDatasource}/>
			</div>
			<Button onClick={() => {
				props.onSubmit(datasource);
				props.onClose();
			}}>
				Submit
			</Button>
		</Dialog>);
}

export default NewDatasourceDialog;
