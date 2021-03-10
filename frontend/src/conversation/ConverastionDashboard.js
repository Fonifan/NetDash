import React, { useEffect, useState } from 'react';
import ControlPanel from '../control/ControlPanel';
import ConversationWidgetGrid from './ConversationWidgetGrid';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import DataService from '../data/DataService';

const useStyles = createUseStyles({
	dashboard: {
		width: '100%'
	}
});

const metaData = {
	octetsByIp: {
		bucketized: true,
		type: 'bar',
		mapping: {
			aggregator: 'packetTime',
			qualifier: 'sourceIp',
			quantifier: 'octets'
		}
	}
};

function ConversationDashboard (props) {
	const classes = useStyles();
	const {
		datasources
	} = props;

	const [selectedDatasource, setSelectedDatasource] = useState();
	const [dataService, setDataService] = useState(new DataService());

	useEffect(() => {
		if (dataService) {
			dataService.close();
		}
		setDataService(new DataService(selectedDatasource));

		return () => {
			dataService.close();
		};
	}, [selectedDatasource]);
	const onSelectDatasource = (name) => {
		setSelectedDatasource(name);
	};

	return (
		<div className={classes.dashboard}>
			<ConversationWidgetGrid dataMap={dataService.getBatch(metaData)}/>
			<ControlPanel
				height={200}
				width={500}
				onSetSelectedDatasource={onSelectDatasource}
				data={dataService.getOverall()}
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
