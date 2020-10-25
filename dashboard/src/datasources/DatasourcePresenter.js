import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Button from '@material-ui/core/Button';
import DatasourceService from './service/DatasourceService';
import ListItem from '@material-ui/core/ListItem';
import DatasourceItemPresenter from './DatasourceItemPresenter';

function DatasourcePresenter () {
	const [datasources, setDatasources] = useState();

	useEffect(() => {
		DatasourceService.getAll().then((datasources) => {
			console.log(datasources);
			setDatasources(datasources);
		});
	}, []);

	return (<div>
		<Button
			color="secondary"
			startIcon={<AddBoxTwoToneIcon/>}
		>
			Add Datasource
		</Button>
		<List>
			{datasources ? Object.keys(datasources).map(key => {
				const datasource = datasources[key];

				return (
					<ListItem button key={key}>
						<DatasourceItemPresenter {...datasource}/>
					</ListItem>);
			}) : null}
		</List>
	</div>);
}

export default DatasourcePresenter;
