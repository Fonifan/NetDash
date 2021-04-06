import React from 'react';
import { createUseStyles } from 'react-jss';
import { IconButton, Skeleton, Heading } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import DatasourceStatus from '../model/DatasourceStatus';

const useStyles = createUseStyles({
	presenter: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		padding: '10px',
		justifyContent: 'space-between',
		borderTop: 'solid'
	},
	buttons: {
		display: 'flex'
	},
	content: {
		display: 'flex',
		flexDirection: 'column'
	}
});

function DatasourceItem (props) {
	const {
		id,
		length,
		status,
		type
	} = props.metadata;
	const classes = useStyles();
	let deleteIcon;
	let item;
	if (status === DatasourceStatus.Status.LOADING) {
		deleteIcon = null;
		item = (<Skeleton height='40px'/>);
	} else {
		deleteIcon = (
			<div className={classes.buttons}>
				<IconButton icon={<DeleteIcon/>} variant='ghost' onClick={() => {
					props.removeDatasource(id, type);
				}}/>
			</div>
		);
		item = (<p>Packets: {length}</p>);
	}
	return (
		<div className={classes.presenter}>
			<div className={classes.content}>
				<Heading as='h3' size='md'>{id}</Heading>
				<p>{type}</p>
				{item}
			</div>
			{deleteIcon}
		</div>
	);
}

export default DatasourceItem;
