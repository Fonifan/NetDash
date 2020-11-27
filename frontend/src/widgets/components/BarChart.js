import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function BarChart (props) {
	let { data } = props;
	if (data === null) {
		data = [
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
	}
	return (
		<ResponsiveBar
			data={data}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			colors={{ scheme: 'nivo' }}
			animate={true}
		/>);
}

export default BarChart;
