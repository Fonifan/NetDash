import React from 'react';
import { VictoryChart, VictoryBar, VictoryTooltip, VictoryLine, VictoryVoronoiContainer } from 'victory';
import { VictoryTheme } from 'victory-core';

const templateData = [
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
	}
];

function VictoryBarChart (props) {
	let { data } = props;
	if (!data) {
		data = templateData;
	}
	return (
		<VictoryChart
			theme={VictoryTheme.material}
			domainPadding={10}
			containerComponent={<VictoryVoronoiContainer/>}
		>
			<VictoryBar
				style={{ data: { fill: '#c43a31' } }}
				data={data}
				labels={({ datum }) => `x:${datum.x}\ny:${datum.y}`}
				labelComponent={<VictoryTooltip/>}
			/>
		</VictoryChart>);
}

export default VictoryBarChart;
