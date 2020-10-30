import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DatasourceService from '../datasources/service/DatasourceService';
import MenuItem from '@material-ui/core/MenuItem';
import { createUseStyles } from 'react-jss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SaveTwoTone } from '@material-ui/icons';

const useStyles = createUseStyles({
	form: {
		display: 'flex',
		flexDirection: 'column',
		padding: '20px'
	},
	field: {
		padding: '10px'
	},
	mappingField: {
		display: 'flex',
		flexDirection: 'row'
	}
});

function QuerySettingsDialog (props) {
	const [datasources, setDatasources] = useState([]);
	const [datasourceId, setDatasourceId] = useState();
	const [query, setQuery] = useState();
	const [mapping, setMapping] = useState({});
	const classes = useStyles();
	useEffect(() => {
		DatasourceService.getAll().then(setDatasources);
	}, []);

	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}>
			<DialogTitle>Widget Settings</DialogTitle>
			<form autoComplete='off' noValidate className={classes.form}>
				<Select
					id='datasourceId'
					defaultValue=''
					className={classes.field}
					value={datasourceId}
					onChange={(event) => setDatasourceId(event.target.value)}>
					{
						datasources.map((datasource) => <MenuItem key={datasource.id} value={datasource.id}>{datasource.name}</MenuItem>)
					}
				</Select>
				<TextareaAutosize
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					rowsMin={5} placeholder='Enter your SQL query here'
					className={classes.field}/>
				{props.mapping.map((mappingField) =>
					<div className={classes.mappingField} key={mappingField}>
						<TextField label={mappingField}
							value={mapping[mappingField]}
							onChange={(event) => setMapping({ ...mapping, [mappingField]: event.target.value })}/>
					</div>)
				}
				<Button
					startIcon={<SaveTwoTone/>}
					onClick={() => {
						props.onApply({
							datasourceId,
							query,
							mapping
						});
						props.onClose();
					}}>
					Apply settings
				</Button>
			</form>
		</Dialog>
	);
}

export default QuerySettingsDialog;
