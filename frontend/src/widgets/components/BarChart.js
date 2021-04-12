import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const templateData = [
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

function BarChart(props) {
  let { data, threeDimensions } = props;
  let keys;
  let indexBy;
  if (!data) {
    data = templateData;
  }
  if (threeDimensions) {
    keys = Array.from(new Set(data.map((e) => Object.keys(e)).flatMap((e) => e)).values()).filter((e) => e !== 'ts');
    indexBy = 'ts';
  }
  if (threeDimensions) {
    return (
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{
          top: 0,
          right: 40,
          bottom: 40,
          left: 80,
        }}
        colors={{ scheme: 'set1' }}
        tooltip={(node) => (
          <p>
            {node.id}
            {' '}
            :
            {' '}
            {node.value}
            {' '}
            @
            {' '}
            {new Date(node.indexValue).toLocaleString('en-US', { timeZone: 'Etc/UTC' })}
          </p>
        )}
        animate={false}
        axisBottom={null}
        enableLabel={false}
        onClick={props.onClick}
      />
    );
  }
  return (
    <ResponsiveBar
      data={data}
      margin={{
        top: 0,
        right: 40,
        bottom: 40,
        left: 100,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 20,
        tickRotation: 0,
      }}
      keys={keys}
      colors={{ scheme: 'set1' }}
      animate={false}
      enableLabel
      layout='horizontal'
      onClick={props.onClick}
    />
  );
}

export default BarChart;
