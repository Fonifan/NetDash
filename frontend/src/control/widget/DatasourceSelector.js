import React, { useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	select: {
		padding: 10
	}
});

function DatasourceSelector (props) {
	const classes = useStyles();
	const [selected, setSelected] = useState('');
	const onChange = (event) => {
		props.onSelected(event.target.value);
		setSelected(event.target.value);
	};
	return (
		<div className={classes.select}>
			<Select onChange={onChange} value={selected}>
				{
					Object.keys(props.datasources).map((datasource) => <MenuItem key={datasource} value={datasource}>{datasource}</MenuItem>)
				}
			</Select>
		</div>
	);
}

export default DatasourceSelector;
