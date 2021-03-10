import React from 'react';
import { createUseStyles } from 'react-jss';
import LineChart from '../widgets/components/LineChart';
import BarChart from '../widgets/components/BarChart';
import VictoryBarChart from '../widgets/components/VictoryBarChart';
import { Bar } from '@nivo/bar';

const fractionAmount = 10;

const useStyles = createUseStyles({
	grid: {
		height: 'calc(100% - 200px)',
		display: 'grid',
		gridTemplateColumns: `repeat(${fractionAmount}, 1fr)`,
		gridTemplateRows: `repeat(${fractionAmount}, 1fr)`
	},
	line: {
		gridRowStart: 1,
		gridRowEnd: 7,
		gridColumnStart: 1,
		gridColumnEnd: 7
	},
	bar: {
		gridRowStart: 1,
		gridRowEnd: 6,
		gridColumnStart: 7,
		gridColumnEnd: 11
	},
	barSecond: {
		gridRowStart: 6,
		gridRowEnd: 11,
		gridColumnStart: 7,
		gridColumnEnd: 11
	}
});

function ConversationWidgetGrid (props) {
	const classes = useStyles();
	const { totalSourceOctets, totalDestinationOctets, octetsByIp } = props.dataMap;

	return (
		<div className={classes.grid}>
			<div className={classes.line}>
				<BarChart data={octetsByIp}/>
			</div>
			<div className={classes.bar}>
				<BarChart data={totalSourceOctets}/>
			</div>
			<div className={classes.barSecond}>
				<BarChart data={totalDestinationOctets}/>
			</div>

		</div>
	);
};

export default ConversationWidgetGrid;
