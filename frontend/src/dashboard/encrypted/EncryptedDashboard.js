import React, { useEffect, useState } from 'react';
import ControlPanel from '../../control/ControlPanel';
import EncryptedWidgetGrid from './EncryptedWidgetGrid';
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
			query: 'select timeStamp as x, sum(fwdRecords) as y from :pcapName group by x order by x'
		},
		trafficBySourceIp: {
			bucketized: true,
			type: 'bar',
			mapping: {
				qualifier: 'x',
				quantifier: 'y',
				aggregator: 'z'
			},
			query: 'select client as x, sum(fwdRecords) as y, timeStamp as z from :pcapName group by x,z order by y'
		},
		trafficByDestinationIp: {
			bucketized: true,
			type: 'bar',
			mapping: {
				qualifier: 'x',
				quantifier: 'y',
				aggregator: 'z'
			},
			query: 'select server as x, sum(fwdRecords) as y, timeStamp as z from :pcapName group by x,z order by y'
		},
		topDestinationIp: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select server as x, sum(fwdRecords) as y from :pcapName group by x order by y limit 10'
		},
		topCipherSuite: {
			bucketized: true,
			type: 'flat',
			mapping: {
				qualifier: 'x',
				quantifier: 'y'
			},
			query: 'select cipherSuite as x, sum(fwdRecords) as y from :pcapName group by x order by y limit 10'
		}
	}
};

function EncryptedDashboard (props) {
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
			<EncryptedWidgetGrid dataMap={dataMap}/>
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
)(EncryptedDashboard);
