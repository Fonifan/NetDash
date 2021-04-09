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
  } else if (threeDimensions) {
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
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
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
        top: 40,
        right: 40,
        bottom: 40,
        left: 50,
      }}
      colors={{ scheme: 'set1' }}
      animate={false}
      axisBottom={null}
      enableLabel
      layout='horizontal'
      onClick={props.onClick}
    />
  );
}

export default BarChart;
