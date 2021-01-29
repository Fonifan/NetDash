import React, { useState } from 'react';
import ControlPanel from '../control/ControlPanel';
import ConversationWidgetGrid from './ConversationWidgetGrid';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import DataService from '../data/service/DataService';
import DataRepository from '../data/repository/DataRepository';

const useStyles = createUseStyles({
	dashboard: {
		width: '100%'
	}
});

const dataMap = {
	totalSourceOctets: {
		id: 'sourceIp',
		value: 'octets'
	},

	totalDestinationOctets: {
		id: 'destinationIp',
		value: 'octets'
	},
	octetsByIp: {
		id: 'sourceIp',
		x: 'packetTime',
		y: 'octets'
	}
};

const metadataMap = {
	octetsByIp: {
		syncBucket: {
			label: 'x',
			value: 'y'
		}
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
		setSelectedDatasource(DataRepository.get(id));
	};

	return (
		<div className={classes.dashboard}>
			<ConversationWidgetGrid dataMap={dataService.getData(dataMap, metadataMap)} />
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
