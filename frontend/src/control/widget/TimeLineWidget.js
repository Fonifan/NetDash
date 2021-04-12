import React, { useState } from 'react';
import {
  VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine,
} from 'victory';
import { VictoryTheme } from 'victory-core';
import { dateFromUTC } from '../../util/ObjectUtil';

function TimeLineWidget(props) {
  const [selectedDomain, setSelectedDomain] = useState();

  const onDomainChange = (domain) => {
    props.onDomainChange(domain);
    setSelectedDomain(domain);
  };
  let data;

  if (props.data) {
    data = props.data.map((d) => ({
      x: dateFromUTC(d.x),
      y: d.y,
    }));
  } else {
    data = [
      {
        x: 1000,
        y: 1,
      },
    ];
  }

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      scale={{ x: 'time' }}
      width={props.width}
      height={props.height}
      padding={{
        top: 0,
        left: 20,
        right: 50,
        bottom: 40,
      }}
      containerComponent={(
        <VictoryBrushContainer
          responsive={false}
          brushDimension='x'
          brushDomain={selectedDomain}
          onBrushDomainChangeEnd={onDomainChange}
        />
  )}
    >
      <VictoryAxis />
      <VictoryLine
        style={{
          data: { stroke: 'tomato' },
        }}
        data={data}
      />
    </VictoryChart>
  );
}

export default TimeLineWidget;
