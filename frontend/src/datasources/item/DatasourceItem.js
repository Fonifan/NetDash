import React from 'react';
import { createUseStyles } from 'react-jss';
import { IconButton, Skeleton, Heading, HStack, Button } from '@chakra-ui/react';
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
		type,
		variants
	} = props.metadata;
	const classes = useStyles();
	let icons;
	let item;
	const onVariantsClick = () => {
		props.openBucketModal(props.metadata);
	};
	if (status === DatasourceStatus.Status.LOADING) {
		icons = null;
		item = (<Skeleton height='40px'/>);
	} else {
		icons = (
            <div className={classes.buttons}>
                <IconButton icon={<DeleteIcon/>} variant='ghost' onClick={() => {
                    props.removeDatasource(id, type);
                }}/>
            </div>
		);
		item = (<HStack spacing='20px'>
                <p>Packets: {length}</p>
                <Button variant='link' onClick={onVariantsClick}>Views: {variants.length}</Button>
            </HStack>
		);
	}
	return (
        <div className={classes.presenter}>
            <div className={classes.content}>
                <Heading as='h3' size='md'>{id}</Heading>
                <p>{type}</p>
                {item}
            </div>
            {icons}
        </div>
	);
}

export default DatasourceItem;
