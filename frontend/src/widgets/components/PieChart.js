import React from 'react';
import { ResponsivePie } from '@nivo/pie';

function PieChart(props) {
  let { data } = props;
  if (!data) {
    data = [
      {
        id: 'a',
        label: 'a',
        value: 101,
      },
      {
        id: 'b',
        label: 'b',
        value: 10,
      },
      {
        id: 'c',
        label: 'c',
        value: 200,
      },
    ];
  }
  return (
    <ResponsivePie
      data={data}
      margin={{
			  top: 40, right: 80, bottom: 80, left: 80,
      }}
      colors={{ scheme: 'set1' }}
      slicesLabelsSkipAngle={10}
      animate
    />
  );
}

export default PieChart;
