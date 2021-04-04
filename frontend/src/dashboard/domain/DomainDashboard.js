import React, { useEffect, useState } from 'react';
import ControlPanel from '../../control/ControlPanel';
import DomainWidgetGrid from './DomainWidgetGrid';
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
			query: 'select timeStamp as x, count(*) as y from :pcapName group by timeStamp order by timeStamp'
		},
		requestsByClient: {
			bucketized: true,
			type: 'bar',
			mapping: {
				qualifier: 'x',
				quantifier: 'y',
				aggregator: 'z'
			},
			query: 'select client as x, count(*) as y, timeStamp as z from :pcapName group by x,z order by y'
		},
		statusesByRequest: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select status as x, count(*) as y from :pcapName group by x order by y'
		},
		categoriesByRequest: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select category as x, count(*) as y from :pcapName group by x order by y'
		},
		alexaByRequests: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select alexa as x, count(*) as y from :pcapName group by x order by y'
		},
		domainByRequests: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select domain as x, count(*) as y from :pcapName group by x order by y'
		}
	}
};

function DomainDashboard (props) {
	const classes = useStyles();
	const {
		datasources
	} = props;

	const [selectedDatasource, setSelectedDatasource] = useState();
	const [dataMap, setDataMap] = useState({
	});

	const onSelectDatasource = (name) => {
		const dataService = new DataService(name);
		setSelectedDatasource(name);
		dataService.getBatch(metaData).then(setDataMap);
	};

	return (
		<div className={classes.dashboard}>
			<DomainWidgetGrid dataMap={dataMap}/>
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
)(DomainDashboard);
