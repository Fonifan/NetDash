import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';
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
					Object.keys(props.datasources).map((datasource) => <option key={datasource} value={datasource}>{datasource}</option>)
				}
			</Select>
		</div>
	);
}

export default DatasourceSelector;
