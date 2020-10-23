import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function BarChart (props) {
	return (
		<ResponsiveBar
			data={props.data}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			colors={{ scheme: 'nivo' }}
			slicesLabelsSkipAngle={10}
			animate={true}
		/>);
}

export default BarChart;
