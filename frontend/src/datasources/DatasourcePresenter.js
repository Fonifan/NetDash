import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import DatasourceItemPresenter from './DatasourceItemPresenter';
import NewDatasourceDialog from './dialog/NewDatasourceDialog';
import { connect } from 'react-redux';
import { addDatasource, setDatasources } from './state/DatasourceAction';
import { createUseStyles } from 'react-jss';
import PcapApi from '../pcap/service/PcapApi';
import DataRepository from '../data/repository/DataRepository';

const useStyles = createUseStyles({
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
		setDatasources
	} = props;
	const [newDatasourceModalOpen, setNewDatasourceModalOpen] = useState(false);
	const classes = useStyles();

	const onSubmit = (datasource) => {
		const formData = new FormData();
		formData.append('file', datasource.file);
		PcapApi.add(formData).then((pcap) => {
			const name = datasource.file.name;
			DataRepository.add({ id: name, data: pcap.data });
			addDatasource({ datasource: { id: name, length: pcap.data.length } });
		});
	};
	return (
		<div>
			<div className={classes.toolBar}>
				<Button
					startIcon={<AddBoxTwoToneIcon/>}
					onClick={() => setNewDatasourceModalOpen(true)}>
					Add Datasource
				</Button>
			</div>
			<List>
				{datasources ? Object.keys(datasources).map((key) => {
					return (
						<ListItem divider key={key}>
							<DatasourceItemPresenter metadata={datasources[key]}/>
						</ListItem>);
				}) : null}
			</List>
			<NewDatasourceDialog
				open={newDatasourceModalOpen}
				onClose={() => setNewDatasourceModalOpen(false)}
				onSubmit={onSubmit}/>
		</div>);
}

export default connect(
	(state) => ({
		datasources: state.datasource.datasources
	}),
	{
		addDatasource,
		setDatasources
	}
)(DatasourcePresenter);
