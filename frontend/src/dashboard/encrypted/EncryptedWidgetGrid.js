import React from 'react';
import { createUseStyles } from 'react-jss';
import BarChart from '../../widgets/components/BarChart';

const fractionAmount = 10;

const useStyles = createUseStyles({
	grid: {
		height: 'calc(100% - 200px)',
		display: 'grid',
		gridTemplateColumns: `repeat(${fractionAmount}, 1fr)`,
		gridTemplateRows: `repeat(${fractionAmount}, 1fr)`
	},
	trafficBySourceIp: {
		gridRowStart: 1,
		gridRowEnd: 6,
		gridColumnStart: 1,
		gridColumnEnd: 7
	},
	trafficByDestinationIp: {
		gridRowStart: 6,
		gridRowEnd: 11,
		gridColumnStart: 1,
		gridColumnEnd: 7
	},
	topDestinationIp: {
		gridRowStart: 6,
		gridRowEnd: 11,
		gridColumnStart: 7,
		gridColumnEnd: 11
	},
	topCipherSuite: {
		gridRowStart: 1,
		gridRowEnd: 6,
		gridColumnStart: 7,
		gridColumnEnd: 11
	}
});

function EncryptedWidgetGrid (props) {
	const classes = useStyles();
	const { trafficBySourceIp, trafficByDestinationIp, topDestinationIp, topCipherSuite } = props.dataMap;

	return (
		<div className={classes.grid}>
			<div className={classes.trafficBySourceIp}>
				<BarChart data={trafficBySourceIp}/>
			</div>
			<div className={classes.trafficByDestinationIp}>
				<BarChart data={trafficByDestinationIp}/>
			</div>
			<div className={classes.topDestinationIp}>
				<BarChart data={topDestinationIp}/>
			</div>
			<div className={classes.topCipherSuite}>
				<BarChart data={topCipherSuite}/>
			</div>
		</div>
	);
};

export default EncryptedWidgetGrid;
