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
	trafficByContentType: {
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
	topContentType: {
		gridRowStart: 1,
		gridRowEnd: 6,
		gridColumnStart: 7,
		gridColumnEnd: 11
	}
});

function FileWidgetGrid (props) {
	const classes = useStyles();
	const { trafficBySourceIp, trafficByContentType, topDestinationIp, topContentType } = props.dataMap;

	return (
		<div className={classes.grid}>
			<div className={classes.trafficBySourceIp}>
				<BarChart data={trafficBySourceIp}/>
			</div>
			<div className={classes.trafficByContentType}>
				<BarChart data={trafficByContentType}/>
			</div>
			<div className={classes.topDestinationIp}>
				<BarChart data={topDestinationIp}/>
			</div>
			<div className={classes.topContentType}>
				<BarChart data={topContentType}/>
			</div>
		</div>
	);
};

export default FileWidgetGrid;
