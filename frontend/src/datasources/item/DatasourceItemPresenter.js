import React from 'react';
import { List, IconButton, ListItem, useToast } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import DatasourceItem from './DatasourceItem';

const useStyles = createUseStyles({
	presenter: {
		padding: '20px',
		display: 'flex',
		flexFlow: 'column wrap',
		height: '93%'
	}

});

function DatasourceItemPresenter (props) {
	const { items } = props;
	const classes = useStyles();
	return (
		<List className={classes.presenter}>
			{items ? Object.keys(items).map((key) => {
				return (
					<ListItem divider key={key}>
						<DatasourceItem metadata={items[key]} removeDatasource={props.removeDatasource}/>
					</ListItem>);
			}) : null}
		</List>
	);
}

export default DatasourceItemPresenter;
