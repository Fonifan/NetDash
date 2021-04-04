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
	} else {
		data.forEach(el => {
			el.ts = new Date(new Date(parseInt(el.ts)).toLocaleString('en-US', { timeZone: 'Etc/UTC' }));
		});
	}
	return (
		<ResponsiveBar
			data={data}
			keys={Array.from(new Set(data.map(e => Object.keys(e)).flatMap(e => e)).values()).filter(e => e !== 'ts')}
			indexBy='ts'
			margin={{
				top: 40,
				right: 80,
				bottom: 80,
				left: 80
			}}
			colors={{ scheme: 'set1' }}
			animate={false}
			axisBottom={null}
			enableLabel={false}

		/>);
}

export default BarChart;
