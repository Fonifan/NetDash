import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';

const templateData = {
	nodes: [
		{
			id: 'A'
		},
		{
			id: 'B'
		},
		{
			id: 'C'
		}
	],
	links: [
		{
			source: 'A',
			target: 'B',
			value: 83
		},
		{
			source: 'A',
			target: 'C',
			value: 41
		},
		{
			source: 'B',
			target: 'C',
			value: 100
		}
	]
};

function SankeyChart (props) {
	let { data } = props;

	if (!data) {
		data = templateData;
	} else {
		data = data[0];
	}
	return (
		<ResponsiveSankey
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
			enableLabel={false}

		/>);
}

export default SankeyChart;
