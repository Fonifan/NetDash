import React from 'react';
import { ResponsiveWaffle } from '@nivo/waffle';

function WaffleChart (props) {
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
	let total = 0;
	data.forEach((obj) => {
		total += obj.value;
	});
	return (
		<ResponsiveWaffle
			data={data}
			margin={{
				top: 40,
				right: 80,
				bottom: 80,
				left: 80
			}}
			total={total}
			rows={18}
			columns={14}
			colors={{ scheme: 'nivo' }}
			animate={true}
		/>);
}

export default WaffleChart;
