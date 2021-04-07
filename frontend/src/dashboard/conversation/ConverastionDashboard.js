import React, { useEffect, useState } from 'react';
import ControlPanel from '../../control/ControlPanel';
import ConversationWidgetGrid from './ConversationWidgetGrid';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import DataService from '../../data/DataService';
import { clearVariables } from '../../variable/state/VariableAction';
import { setDatasource } from '../state/DashboardAction';

const dashboardId = 'conversation';

const useStyles = createUseStyles({
	dashboard: {
		width: '100%'
	}
});

const metaData = {
	metaDataMap: {
		overall: {
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select packettime as x, sum(octets) as y from :pcapName group by packettime order by packettime'
		},
		totalDestinationOctets: {
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
				' order by ts'
		},
		totalSourceOctets: {
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
				' order by ts'
		},
		sourceToProtocolByOctets: {
			type: 'sankey',
			mapping: {
				qualifier: 'x',
				quantifier: 'y',
				aggregator: 'z'
			},
			query: 'select sourceip as x, protocol as y, sum(octets) as z from :pcapName /*where*/ group by x,y order by z desc limit 10'
		},
		octetsBySourceIp: {
			type: 'flat',
			mapping: {
				qualifier: 'id',
				quantifier: 'value'
			},
			query: 'select sum(octets) as value, sourceip as id\n' +
				'  from :pcapName\n' +
				'/*where*/' +
				' group by id\n' +
				' order by value desc' +
				' limit 10'
		}
	}
};

function ConversationDashboard (props) {
	const classes = useStyles();
	const {
		datasources,
		variables,
		clearVariables,
		setDatasource,
		conversation
	} = props;
	const { datasource } = conversation;
	const [dataMap, setDataMap] = useState({});

	const onSelectDatasource = (selected) => {
		selected.tableIdentifier = dashboardId;
		setDatasource({ name: dashboardId, datasource: selected });
		const dataService = new DataService(selected);
		clearVariables();
		dataService.getBatch(metaData).then(setDataMap);
	};

	useEffect(() => {
		if (Object.keys(datasource).length !== 0) {
			const dataService = new DataService(datasource);
			dataService.getBatch(metaData, variables).then(setDataMap);
		}
	}, [variables]);

	return (
		<div className={classes.dashboard}>
			<ControlPanel
				height={125}
				width={500}
				onSetSelectedDatasource={onSelectDatasource}
				data={dataMap.overall}
				datasources={datasources}
				selectedDatasource={datasource}
			/>
			<ConversationWidgetGrid dataMap={dataMap}/>
		</div>);
}

export default connect(
	(state) => ({ // TODO: move dashboard state here
		datasources: state.datasource.datasources,
		variables: state.variable.variables,
		conversation: state.dashboard.conversation
	}),
	{
		clearVariables,
		setDatasource
	}
)(ConversationDashboard);
