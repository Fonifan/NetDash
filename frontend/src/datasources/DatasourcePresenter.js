import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Button from '@material-ui/core/Button';
import DatasourceService from './service/DatasourceService';
import ListItem from '@material-ui/core/ListItem';
import DatasourceItemPresenter from './DatasourceItemPresenter';
import NewDatasourceDialog from './NewDatasourceDialog';
import { connect } from 'react-redux';
import { addDatasource, setDatasources } from './state/DatasourceAction';
import { RefreshTwoTone } from '@material-ui/icons';

function DatasourcePresenter (props) {
	const { datasources, addDatasource, setDatasources } = props;
	const [newDatasourceModalOpen, setNewDatasourceModalOpen] = useState(false);

	useEffect(() => {
		if (Object.keys(datasources).length === 0) {
			refreshDatasources();
		}
	}, []);

	return (<div>
		<Button
			startIcon={<AddBoxTwoToneIcon/>}
			onClick={() => setNewDatasourceModalOpen(true)}>
			Add Datasource
		</Button>
		<Button
			startIcon={<RefreshTwoTone/>}
			onClick={() => refreshDatasources()}>
			Refresh Datasources
		</Button>
		<List>
			{datasources ? Object.keys(datasources).map(key => {
				const datasource = datasources[key];

				return (
					<ListItem divider key={key}>
						<DatasourceItemPresenter {...datasource}/>
					</ListItem>);
			}) : null}
		</List>
		<NewDatasourceDialog
			open={newDatasourceModalOpen}
			onClose={() => setNewDatasourceModalOpen(false)}
			onSubmit={(datasource) => {
				DatasourceService.add(datasource).then((id) => {
					datasource.id = id;
					addDatasource(datasource);
				});
			}}/>
	</div>);

	function refreshDatasources () {
		DatasourceService.getAll().then(setDatasources);
	}
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
