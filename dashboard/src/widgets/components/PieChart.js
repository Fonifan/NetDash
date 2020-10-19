import React from 'react';
import { ResponsivePie } from '@nivo/pie';

function PieChart (props) {
	return (
		<ResponsivePie
			data={props.data}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			colors={{ scheme: 'nivo' }}
			slicesLabelsSkipAngle={10}
			animate={true}
		/>);
}

export default PieChart;
