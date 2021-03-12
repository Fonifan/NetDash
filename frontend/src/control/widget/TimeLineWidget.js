import React, { useState } from 'react';
import { VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine } from 'victory';
import { VictoryTheme } from 'victory-core';

const bottomPadding = 30;

function TimeLineWidget (props) {
	const [selectedDomain, setSelectedDomain] = useState();

	const onDomainChange = (domain) => {
		props.onDomainChange(domain);
		setSelectedDomain(domain);
	};
	const data = props.data.map((d) => ({
		x: new Date(new Date(d.x).toLocaleString('en-US', { timeZone: 'UTC' })),
		y: d.y
	}));

	return (
		<VictoryChart
			theme={VictoryTheme.material}
			width={props.width}
			height={props.height - bottomPadding}
			scale={{ x: 'time' }}
			padding={{
				top: 0,
				left: 50,
				right: 50,
				bottom: bottomPadding
			}}
			containerComponent={
				<VictoryBrushContainer responsive={false}
					brushDimension='x'
					brushDomain={selectedDomain}
					onBrushDomainChangeEnd={onDomainChange}
				/>
			}
		>
			<VictoryAxis/>
			<VictoryLine
				style={{
					data: { stroke: 'tomato' }
				}}
				data={data}
			/>
		</VictoryChart>);
}

export default TimeLineWidget;
