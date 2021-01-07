import React, { useState } from 'react';
import ControlPanel from '../control/ControlPanel';
import ConversationWidgetGrid from './ConversationWidgetGrid';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import DataService from '../data/service/DataService';

const useStyles = createUseStyles({
	dashboard: {
		width: '100%'
	}
});

const dataMap = {
	totalSourceOctetsBarChart: {
		id: 'sourceIp',
		value: 'octets'
	},

	totalDestinationOctetsBarChart: {
		id: 'destinationIp',
		value: 'octets'
	}
};

function ConversationDashboard (props) {
	const classes = useStyles();
	const {
		datasources,
		variables
	} = props;

	const [selectedDatasource, setSelectedDatasource] = useState();
	const dataService = new DataService(selectedDatasource, variables);

	const onSelectDatasource = (id) => {
		setSelectedDatasource(datasources[id].data);
	};

	return (
		<div className={classes.dashboard}>
			<ConversationWidgetGrid dataMap={dataService.getData(dataMap)} />
			<ControlPanel
				height={200}
				width={500}
				onSetSelectedDatasource={onSelectDatasource}
				data={dataService.getTimeLine()}
				datasources={datasources}
			/>
		</div>);
}

export default connect(
	(state) => ({
		datasources: state.datasource.datasources,
		variables: state.variable.variables
	})
)(ConversationDashboard);
