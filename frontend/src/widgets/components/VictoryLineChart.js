import React from 'react';
import { VictoryChart, VictoryLine, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import { VictoryTheme } from 'victory-core';

const templateData = [
	{
		id: 'template',
		data: [
			{
				x: 0,
				y: 0
			},
			{
				x: 1,
				y: 1
			},
			{
				x: 2,
				y: 4
			},
			{
				x: 3,
				y: 9
			},
			{
				x: 4,
				y: 16
			},
			{
				x: 5,
				y: 25
			},
			{
				x: 6,
				y: 36
			}]
	}
];

function VictoryLineChart (props) {
	let { data } = props;
	if (!data) {
		data = templateData;
	}
	return (
		<VictoryChart
			theme={VictoryTheme.material}
			padding={{
				top: 20,
				left: 20,
				right: 20,
				bottom: 30
			}}
			containerComponent={<VictoryVoronoiContainer/>}
		>
			{
				data.map((element) =>
					<VictoryLine
						key={element.id}
						data={element.data}
						style={{
							data: { stroke: 'tomato' }
						}}
						samples={100}
						labels={({ datum }) => `x:${datum.x}\ny:${datum.y}`}
						labelComponent={<VictoryTooltip/>}
					/>
				)
			}
		</VictoryChart>);
}

export default VictoryLineChart;
