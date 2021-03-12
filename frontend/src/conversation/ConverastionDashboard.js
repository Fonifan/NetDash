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
	metaDataMap: {
		overall: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select packettime as x, sum(octets) as y from :pcapName group by packettime order by packettime'
		},
		totalDestinationOctets: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'id',
				quantifier: 'value'
			},
			query: 'select sum(octets) as value, destinationip as id\n' +
				'  from :pcapName\n' +
				' group by id\n' +
				' order by value desc'
		},
		totalSourceOctets: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'id',
				quantifier: 'value'
			},
			query: 'select sum(octets) as value, sourceip as id\n' +
				'  from :pcapName\n' +
				' group by id\n' +
				' order by value desc'
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
				' order by value desc'
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
				' order by value desc'
		}
	}
};

function ConversationDashboard (props) {
	const classes = useStyles();
	const {
		datasources
	} = props;

	const [selectedDatasource, setSelectedDatasource] = useState();
	const [dataMap, setDataMap] = useState({
		overall: [],
		octetsByProtocol: [],
		totalSourceOctets: [],
		packetsBySourceIp: [],
		totalDestinationOctets: []
	});

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
