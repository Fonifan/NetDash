import React, { useEffect, useState } from 'react';
import ControlPanel from '../../control/ControlPanel';
import ConversationWidgetGrid from './ConversationWidgetGrid';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import DataService from '../../data/DataService';

const useStyles = createUseStyles({
	dashboard: {
		width: '100%'
	}
});

const metaData = {
	metaDataMap: {
		overall: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select packettime as x, sum(octets) as y from :pcapName group by packettime order by packettime',
			tableIdentifier: 'conversation'
		},
		totalDestinationOctets: {
			bucketized: true,
			type: 'bar',
			mapping: {
				qualifier: 'id',
				quantifier: 'value',
				aggregator: 'ts'
			},
			query: 'select sum(octets) as value, destinationip as id, packettime as ts\n' +
				'  from :pcapName\n' +
				' group by id, ts\n' +
				' order by ts',
			tableIdentifier: 'conversation'
		},
		totalSourceOctets: {
			bucketized: true,
			type: 'bar',
			mapping: {
				qualifier: 'id',
				quantifier: 'value',
				aggregator: 'ts'
			},
			query: 'select sum(octets) as value, sourceip as id, packettime as ts\n' +
				'  from :pcapName\n' +
				' group by id, ts\n' +
				' order by ts',
			tableIdentifier: 'conversation'
		},
		octetsByProtocol: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'id',
				quantifier: 'value'
			},
			query: 'select sum(octets) as value, protocol as id\n' +
				'  from :pcapName\n' +
				' group by id\n' +
				' order by value desc',
			tableIdentifier: 'conversation'
		},
		packetsBySourceIp: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'id',
				quantifier: 'value'
			},
			query: 'select count(*) as value, sourceip as id\n' +
				'  from :pcapName\n' +
				' group by id\n' +
				' order by value desc',
			tableIdentifier: 'conversation'
		}
	}
};

function ConversationDashboard (props) {
	const classes = useStyles();
	const {
		datasources
	} = props;

	const [selectedDatasource, setSelectedDatasource] = useState();
	const [dataMap, setDataMap] = useState({});

	const onSelectDatasource = (name) => {
		const dataService = new DataService(name);
		setSelectedDatasource(name);
		dataService.getBatch(metaData).then(setDataMap);
	};

	return (
		<div className={classes.dashboard}>
			<ConversationWidgetGrid dataMap={dataMap}/>
			<ControlPanel
				height={200}
				width={500}
				onSetSelectedDatasource={onSelectDatasource}
				data={dataMap.overall}
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
