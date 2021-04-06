import React, { useEffect, useState } from 'react';
import { List, IconButton, ListItem, useToast } from '@chakra-ui/react';
import { AddIcon, RepeatIcon } from '@chakra-ui/icons';
import DatasourceItemPresenter from './item/DatasourceItemPresenter';
import NewDatasourceDialog from './dialog/NewDatasourceDialog';
import { connect } from 'react-redux';
import { addDatasource, editDatasource, removeDatasource, setDatasources } from './state/DatasourceAction';
import { createUseStyles } from 'react-jss';
import PcapApi from '../pcap/service/PcapApi';
import DatasourceStatus from './model/DatasourceStatus';
import DatasourceService from './service/DatasourceService';

const useStyles = createUseStyles({
	presenter: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	toolBar: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10
	}
});

function DatasourcePresenter (props) {
	const {
		datasources,
		addDatasource,
		editDatasource,
		removeDatasource,
		setDatasources
	} = props;
	const [dialogueOpen, setDialogueOpen] = useState(false);
	const classes = useStyles();
	const toast = useToast();
	useEffect(() => {
		if (Object.keys(datasources).length === 0) {
			loadDatasources();
		}
	}, []);
	const onSubmit = (datasource) => {
		const {
			file,
			type
		} = datasource;
		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', type);
		addDatasource({
			datasource: {
				id: file.name,
				status: DatasourceStatus.Status.LOADING,
				type
			}
		});
		setDialogueOpen(false);
		PcapApi.add(formData).then((pcap) => {
			editDatasource({
				datasource: {
					id: file.name,
					length: pcap,
					status: DatasourceStatus.Status.READY
				}
			});
		}).catch((error) => {
			toast({
				title: 'Failed to parse PCAP',
				description: error.message,
				status: 'error',
				isClosable: true
			});
			console.error(error);
			removeDatasource(file.name);
		});
	};
	const onRemoveDatasource = (name, type) => {
		removeDatasource(name);
		DatasourceService.remove(name, type);
	};
	return (
		<div className={classes.presenter}>
			<div className={classes.toolBar}>
				<IconButton
					icon={<AddIcon/>}
					onClick={() => setDialogueOpen(true)}
					variant='ghost'>
					Add Datasource
				</IconButton>
				<IconButton
					icon={<RepeatIcon/>}
					onClick={loadDatasources}
					variant='ghost'>
					Reload Datasources
				</IconButton>
			</div>
			<DatasourceItemPresenter items={datasources} removeDatasource={onRemoveDatasource}/>
			<NewDatasourceDialog
				open={dialogueOpen}
				onSubmit={onSubmit}
				onClose={() => setDialogueOpen(false)}
			/>
		</div>);

	async function loadDatasources () {
		const datasourceObject = {};
		const datasources = await DatasourceService.getAll();
		datasources.forEach((datasource) => {
			const { name, ...ds } = datasource;
			ds.id = name;
			ds.status = DatasourceStatus.Status.READY;
			datasourceObject[datasource.name] = ds;
		});
		setDatasources(datasourceObject);
	}
}

export default connect(
	(state) => ({
		datasources: state.datasource.datasources
	}),
	{
		addDatasource,
		removeDatasource,
		setDatasources,
		editDatasource
	}
)(DatasourcePresenter);
