import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const templateData = [
	{
		id: 'a',
		label: 'a',
		value: 101
	},
	{
		id: 'b',
		label: 'b',
		value: 10
	},
	{
		id: 'c',
		label: 'c',
		value: 200
	}
];

function BarChart (props) {
	let { data } = props;

	if (!data) {
		data = templateData;
	}
	return (
		<ResponsiveBar
			data={data}
			margin={{
				top: 40,
				right: 80,
				bottom: 80,
				left: 80
			}}
			colors={{ scheme: 'set1' }}
			animate={false}
			axisBottom={null}
		/>);
}

export default BarChart;
