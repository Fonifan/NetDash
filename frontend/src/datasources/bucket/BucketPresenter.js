import React from 'react';
import { createUseStyles } from 'react-jss';
import {
	List,
	ListItem,
	Skeleton,
	HStack,
	Divider
} from '@chakra-ui/react';
import DatasourceStatus from '../model/DatasourceStatus';

const useStyles = createUseStyles({
	list: {
		border: 'solid',
		borderRadius: '10px',
		borderWidth: '2px'
	},
	listItem: {
		padding: '10px'
	},
	skeleton: {
		flex: '1',
		height: '15px',
		borderRadius: '8px'
	}
});

export default function BucketPresenter (props) {
	const classes = useStyles();
	const { variants } = props.metaData;
	const renderedVariants = variants.map((variant) => {
		if (variant.status === DatasourceStatus.Status.LOADING) {
			return (
                <ListItem key={variant.bucketSize} className={classes.listItem}>
					<HStack >
						<p>{variant.bucketSize}:</p>
						<Skeleton className={classes.skeleton}/>
					</HStack>
					<Divider />
                </ListItem>
			);
		} else {
			return (
				<ListItem key={variant.bucketSize} className={classes.listItem}>
					<HStack>
						<p>{variant.bucketSize}:</p>
						<p>{variant.packetsCount}</p>
					</HStack>
					<Divider />
				</ListItem>
			);
		}
	});
	return (
        <List className={classes.list}>
            {renderedVariants}
        </List>
	);
}
