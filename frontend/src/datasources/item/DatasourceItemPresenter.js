import React, { useState } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import DatasourceItem from './DatasourceItem';
import BucketModal from '../bucket/BucketModal';

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
	const [bucketModalOpen, setBucketModalOpen] = useState(false);
	const [datasourceMetadata, setDatasourceMetadata] = useState();
	const classes = useStyles();
	const onOpenBucketModal = (datasourceMetadata) => {
		setDatasourceMetadata(datasourceMetadata);
		setBucketModalOpen(true);
	};
	const onCloseBucketModal = () => {
		setBucketModalOpen(false);
	};
	return (
		<>
			<List className={classes.presenter}>
				{items ? Object.keys(items).map((key) => {
					return (
						<ListItem divider key={key}>
							<DatasourceItem
								metadata={items[key]}
								removeDatasource={props.removeDatasource}
								openBucketModal={onOpenBucketModal}
							/>
						</ListItem>);
				}) : null}
			</List>
			<BucketModal isOpen={bucketModalOpen} onClose={onCloseBucketModal} metaData={datasourceMetadata}/>
		</>
	);
}

export default DatasourceItemPresenter;
