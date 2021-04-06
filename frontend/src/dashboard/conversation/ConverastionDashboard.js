import React, { useEffect, useState } from 'react';
import ControlPanel from '../../control/ControlPanel';
import ConversationWidgetGrid from './ConversationWidgetGrid';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import DataService from '../../data/DataService';
import { clearVariables } from '../../variable/state/VariableAction';

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
				'/*where*/' +
				' group by id, ts\n' +
				' order by ts',
			tableIdentifier: 'conversation'
		},
		// sourceToDestinationByOctets: {
		// 	bucketized: true,
		// 	type: 'sankey',
		// 	mapping: {
		// 		qualifier: 'x',
		// 		quantifier: 'y',
		// 		aggregator: 'z'
		// 	},
		// 	query: 'select sourceip as x, destinationip as y, sum(octets) as z from :pcapName group by x,y order by z desc',
		// 	tableIdentifier: 'conversation'
		// },
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
				'/*where*/' +
				' group by id, ts\n' +
				' order by ts',
			tableIdentifier: 'conversation'
		},
		sourceToProtocolByOctets: {
			bucketized: true,
			type: 'sankey',
			mapping: {
				qualifier: 'x',
				quantifier: 'y',
				aggregator: 'z'
			},
			query: 'select sourceip as x, protocol as y, sum(octets) as z from :pcapName /*where*/ group by x,y order by z desc limit 10',
			tableIdentifier: 'conversation'
		},
		octetsBySourceIp: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'id',
				quantifier: 'value'
			},
			query: 'select sum(octets) as value, sourceip as id\n' +
				'  from :pcapName\n' +
				'/*where*/' +
				' group by id\n' +
				' order by value desc',
			tableIdentifier: 'conversation'
		}
	}
};

function ConversationDashboard (props) {
	const classes = useStyles();
	const {
		datasources,
		variables,
		clearVariables
	} = props;

	const [selectedDatasource, setSelectedDatasource] = useState();
	const [dataMap, setDataMap] = useState({});

	const onSelectDatasource = (name) => {
		setSelectedDatasource(name);
		const dataService = new DataService(name);
		clearVariables();
		dataService.getBatch(metaData).then(setDataMap);
	};

	useEffect(() => {
		if (selectedDatasource) {
			const dataService = new DataService(selectedDatasource);
			dataService.getBatch(metaData, variables).then(setDataMap);
		}
	}, [variables]);

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
	}),
	{
		clearVariables
	}
)(ConversationDashboard);
