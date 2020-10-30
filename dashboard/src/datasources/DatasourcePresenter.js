import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Button from '@material-ui/core/Button';
import DatasourceService from './service/DatasourceService';
import ListItem from '@material-ui/core/ListItem';
import DatasourceItemPresenter from './DatasourceItemPresenter';
import NewDatasourceDialog from './NewDatasourceDialog';

function DatasourcePresenter () {
	const [datasources, setDatasources] = useState();
	const [newDatasourceModalOpen, setNewDatasourceModalOpen] = useState(false);

	useEffect(() => {
		DatasourceService.getAll().then((datasources) => {
			setDatasources(datasources);
		});
	}, []);

	return (<div>
		<Button
			startIcon={<AddBoxTwoToneIcon/>}
			onClick={() => setNewDatasourceModalOpen(true)}>
			Add Datasource
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
					setDatasources({ ...datasources, [id]: datasource });
				});
			}}/>
	</div>);
}

export default DatasourcePresenter;
