import React from 'react';
import { createUseStyles } from 'react-jss';
import BarChart from '../../widgets/components/BarChart';
import SankeyChart from '../../widgets/components/SankeyChart';

const fractionAmount = 15;

const useStyles = createUseStyles({
  grid: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: `repeat(${fractionAmount}, 1fr)`,
    gridTemplateRows: `repeat(${fractionAmount}, 1fr)`,
    flexGrow: 5,
  },
  totalSourceOctets: {
    gridRowStart: 1,
    gridRowEnd: 7,
    gridColumnStart: 1,
    gridColumnEnd: 16,
  },
  totalDestinationOctets: {
    gridRowStart: 7,
    gridRowEnd: 11,
    gridColumnStart: 1,
    gridColumnEnd: 7,
  },
  octetsByProtocol: {
    gridRowStart: 7,
    gridRowEnd: 11,
    gridColumnStart: 7,
    gridColumnEnd: 11,
  },
  packetsBySourceIp: {
    gridRowStart: 7,
    gridRowEnd: 11,
    gridColumnStart: 11,
    gridColumnEnd: 15,
  },
});

function ConversationWidgetGrid(props) {
  const classes = useStyles();
  const {
    totalSourceOctets,
    totalDestinationOctets,
    sourceToProtocolByOctets,
    octetsBySourceIp,
  } = props.dataMap;

  const handleSourceIpFilter = (element) => {
    props.onFilter({ element, filterName: 'sourceIp' });
  };
  const handleDestinationIpFilter = (element) => {
    props.onFilter({ element, filterName: 'destinationIp' });
  };
  const handleProtocolFilter = (element) => {
    props.onFilter({ element, filterName: 'protocol' });
  };

  return (
    <div className={classes.grid}>
      <div className={classes.totalSourceOctets}>
        <BarChart data={totalSourceOctets} threeDimensions onClick={handleSourceIpFilter} />
      </div>
      <div className={classes.totalDestinationOctets}>
        <BarChart data={totalDestinationOctets} threeDimensions onClick={handleDestinationIpFilter} />
      </div>
      <div className={classes.octetsByProtocol}>
        <SankeyChart data={sourceToProtocolByOctets} onClick={handleProtocolFilter} />
      </div>
      <div className={classes.packetsBySourceIp}>
        <BarChart data={octetsBySourceIp} onClick={handleSourceIpFilter} />
      </div>
    </div>
  );
}

export default ConversationWidgetGrid;
