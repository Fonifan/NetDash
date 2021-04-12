import React from 'react';
import { ResponsiveChord } from '@nivo/chord';

const templateData = [
  [
    149,
    144,
    426,
    95,
    505,
  ],
  [
    35,
    1524,
    837,
    433,
    359,
  ],
  [
    479,
    1874,
    125,
    179,
    1843,
  ],
  [
    488,
    143,
    117,
    316,
    205,
  ],
  [
    1879,
    219,
    1611,
    1007,
    463,
  ],
];

function ChordChart(props) {
  const { data } = props;
  let matrix = [];
  let keys = [];
  if (!data) {
    matrix = templateData;
    keys = ['a', 'b', 'c', 'd', 'e'];
  } else {
    data.forEach((el) => {
      keys.push(Object.keys(el)[0]);
      matrix.push(Object.values(el)[0]);
    });
  }
  return (
    <ResponsiveChord
      matrix={matrix}
      margin={{
        top: 0, right: 0, bottom: 20, left: 0,
      }}
      colors={{ scheme: 'set1' }}
      keys={keys}
      padAngle={0.02}
      innerRadiusRatio={0.96}
      innerRadiusOffset={0.02}
      arcOpacity={1}
      arcBorderWidth={1}
      arcBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
      ribbonOpacity={0.5}
      ribbonBorderWidth={1}
      ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
      isInteractive
      arcHoverOpacity={1}
      arcHoverOthersOpacity={0.25}
      ribbonHoverOpacity={0.75}
      ribbonHoverOthersOpacity={0.25}
      onArcClick={props.onClick}
      enableLabel={false}
    />
  );
}

export default ChordChart;
