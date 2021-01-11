import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function LineChart (props) {
	let { data } = props;

	if (!data) {
		data = [
			{
				id: 'japan',
				data: [
					{
						x: 'plane',
						y: 2
					},
					{
						x: 'helicopter',
						y: 241
					}
				]
			},
			{
				id: 'france',
				color: 'hsl(13, 70%, 50%)',
				data: [
					{
						x: 'plane',
						y: 114
					},
					{
						x: 'helicopter',
						y: 35
					}
				]
			}
		];
	}

	return (
		<ResponsiveLine
			data={data}
			margin={{
				top: 40,
				right: 120,
				bottom: 80,
				left: 80
			}}
			colors={{ scheme: 'set1' }}
			slicesLabelsSkipAngle={10}
			animate={false}
			useMesh={true}
			legends={[
				{
					anchor: 'top-right',
					direction: 'column',
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: 'left-to-right',
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: 'circle'
				}
			]}
			axisBottom={{
				tickRotation: 90
			}}
		/>);
}

export default LineChart;
