import React from 'react';
import { createUseStyles } from 'react-jss';
import { VStack } from '@chakra-ui/react';
import BarChart from '../../widgets/components/BarChart';

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
    gridColumnEnd: 9,
  },
  destinationToSource: {
    gridRowStart: 7,
    gridRowEnd: 11,
    gridColumnStart: 9,
    gridColumnEnd: 16,
  },
  octetsBySourcePort: {
    gridRowStart: 11,
    gridRowEnd: 16,
    gridColumnStart: 1,
    gridColumnEnd: 7,
  },
  octetsByProtocol: {
    gridRowStart: 11,
    gridRowEnd: 16,
    gridColumnStart: 7,
    gridColumnEnd: 11,
  },
  packetsBySourceIp: {
    gridRowStart: 11,
    gridRowEnd: 16,
    gridColumnStart: 11,
    gridColumnEnd: 15,
  },
});

function ConversationWidgetGrid(props) {
  const classes = useStyles();
  const {
    totalSourceOctets,
    totalDestinationOctets,
    protocolByOctets,
    octetsBySourceIp,
    octetsBySourcePort,
    destinationToSource,
  } = props.dataMap;

  const handleFilter = (element, dimensions, filterName) => {
    if (dimensions === 3) {
      props.onFilter({ value: element.id, filterName });
    } else if (dimensions === 2) {
      props.onFilter({ value: element.indexValue, filterName });
    }
  };

  return (
    <div className={classes.grid}>
      <VStack className={classes.totalSourceOctets}>
        <p>Total Source IP Octets</p>
        <BarChart
          data={totalSourceOctets}
          threeDimensions
          onClick={(element) => handleFilter(element, 3, 'sourceIp')}
        />
      </VStack>

      <VStack className={classes.totalDestinationOctets}>
        <p>Total Destination IP Octets</p>
        <BarChart
          data={totalDestinationOctets}
          threeDimensions
          onClick={(element) => handleFilter(element, 3, 'destinationIp')}
        />
      </VStack>
      {/* <VStack className={classes.destinationToSource}> */}
      {/*  <p>Destination to Source IP</p> */}
      {/*  <BarChart data={destinationToSource} threeDimensions onClick={handleDestinationIpFilter} /> */}
      {/* </VStack> */}

      <VStack className={classes.octetsBySourcePort}>
        <p>Octets by source port</p>
        <BarChart
          data={octetsBySourcePort}
          onClick={(element) => handleFilter(element, 2, 'sourcePort')}
        />
      </VStack>
      <VStack className={classes.octetsByProtocol}>
        <p>Octets by Protocol</p>
        <BarChart
          data={protocolByOctets}
          onClick={(element) => handleFilter(element, 2, 'protocol')}
        />
      </VStack>
      <VStack className={classes.packetsBySourceIp}>
        <p>Octets by source IP</p>
        <BarChart
          data={octetsBySourceIp}
          onClick={(element) => handleFilter(element, 2, 'sourceIp')}
        />
      </VStack>
    </div>
  );
}

export default ConversationWidgetGrid;
