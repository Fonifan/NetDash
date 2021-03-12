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
	totalSourceOctets: {
		gridRowStart: 1,
		gridRowEnd: 6,
		gridColumnStart: 1,
		gridColumnEnd: 7
	},
	totalDestinationOctets: {
		gridRowStart: 6,
		gridRowEnd: 11,
		gridColumnStart: 1,
		gridColumnEnd: 7
	},
	octetsByProtocol: {
		gridRowStart: 6,
		gridRowEnd: 11,
		gridColumnStart: 7,
		gridColumnEnd: 11
	},
	packetsBySourceIp: {
		gridRowStart: 1,
		gridRowEnd: 6,
		gridColumnStart: 7,
		gridColumnEnd: 11
	}
});

function ConversationWidgetGrid (props) {
	const classes = useStyles();
	const { totalSourceOctets, totalDestinationOctets, octetsByProtocol, packetsBySourceIp } = props.dataMap;

	return (
		<div className={classes.grid}>
			<div className={classes.totalSourceOctets}>
				<BarChart data={totalSourceOctets}/>
			</div>
			<div className={classes.totalDestinationOctets}>
				<BarChart data={totalDestinationOctets}/>
			</div>
			<div className={classes.octetsByProtocol}>
				<BarChart data={octetsByProtocol}/>
			</div>
			<div className={classes.packetsBySourceIp}>
				<BarChart data={packetsBySourceIp}/>
			</div>
		</div>
	);
};

export default ConversationWidgetGrid;
