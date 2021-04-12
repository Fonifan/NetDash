const metaDataSkeleton = {
  metaDataMap: {
    overall: {
      type: 'flat',
      mapping: {
        qualifier: 'x',
        quantifier: 'y',
      },
    },
    totalDestinationOctets: {
      type: 'bar',
      mapping: {
        qualifier: 'id',
        quantifier: 'value',
        aggregator: 'ts',
      },
    },
    totalSourceOctets: {
      type: 'bar',
      mapping: {
        qualifier: 'id',
        quantifier: 'value',
        aggregator: 'ts',
      },
    },
    protocolByOctets: {
      type: 'flat',
      mapping: {
        qualifier: 'id',
        quantifier: 'value',
      },
    },
    octetsBySourceIp: {
      type: 'flat',
      mapping: {
        qualifier: 'id',
        quantifier: 'value',
      },
    },
    octetsBySourcePort: {
      type: 'flat',
      mapping: {
        qualifier: 'id',
        quantifier: 'value',
      },
    },
    destinationToSource: {
      type: 'chord',
      mapping: {
        qualifier: 'x',
        quantifier: 'y',
        aggregator: 'z',
      },
    },
  },
};

const querySet = {
  octets: {
    overall: 'select packettime as x, sum(octets) as y from :pcapName group by packettime order by packettime',
    totalDestinationOctets: 'select sum(octets) as value, destinationip as id, packettime as ts\n'
            + '  from :pcapName\n'
            + '/*where*/'
            + ' group by id, ts\n'
            + ' order by ts',
    totalSourceOctets: 'select sum(octets) as value, sourceip as id, packettime as ts\n'
            + '  from :pcapName\n'
            + '/*where*/'
            + ' group by id, ts\n'
            + ' order by ts',
    protocolByOctets: 'select protocol as id, sum(octets) as value from :pcapName /*where*/ group by id order by value desc limit 10',
    octetsBySourceIp: 'select sum(octets) as value, sourceip as id\n'
            + '  from :pcapName\n'
            + '/*where*/'
            + ' group by id\n'
            + ' order by value desc'
            + ' limit 10',
    octetsBySourcePort: 'select sourceport as id, sum(octets) as value\n'
        + 'from :pcapName\n'
        + '/*where*/\n'
        + 'group by id\n'
        + 'order by value desc\n'
        + 'limit 10\n',
    destinationToSource: 'select sourceip as x, destinationip as y, sum(octets) as z from :pcapName /*where*/ group by x, y order by z desc limit 10',
  },
  packets: {
    overall: 'select packettime as x,count(*) as y from :pcapName group by packettime order by packettime',
    totalDestinationOctets: 'select count(*) as value, destinationip as id, packettime as ts\n'
            + 'from :pcapName\n'
            + '/*where*/'
            + 'group by id, ts\n'
            + 'order by ts',
    totalSourceOctets: 'select count(*) as value, sourceip as id, packettime as ts\n'
            + ' from :pcapName\n'
            + '/*where*/'
            + ' group by id, ts\n'
            + ' order by ts',
    protocolByOctets: 'select protocol as id, count(*) as value from :pcapName /*where*/ group by id order by value desc limit 10',
    octetsBySourceIp: 'select count(*) as value, sourceip as id\n'
            + ' from :pcapName\n'
            + '/*where*/'
            + ' group by id\n'
            + ' order by value desc'
            + ' limit 10',
    octetsBySourcePort: 'select sourceport as id, count(*) as value\n'
        + 'from :pcapName\n'
        + '/*where*/\n'
        + 'group by id\n'
        + 'order by value desc\n'
        + 'limit 10\n',
    destinationToSource: 'select sourceip as x, destinationip as y, count(*) as z from :pcapName /*where*/ group by x, y order by z desc limit 10',
  },
  packetsBucketized: {
    overall: 'select packettime as x,sum(packets) as y from :pcapName group by packettime order by packettime',
    totalDestinationOctets: 'select sum(packets) as value, destinationip as id, packettime as ts\n'
            + 'from :pcapName\n'
            + '/*where*/'
            + 'group by id, ts\n'
            + 'order by ts',
    totalSourceOctets: 'select sum(packets) as value, sourceip as id, packettime as ts\n'
            + ' from :pcapName\n'
            + '/*where*/'
            + ' group by id, ts\n'
            + ' order by ts',
    protocolByOctets: 'select protocol as id, sum(packets) as value from :pcapName /*where*/ group by id order by value desc limit 10',
    octetsBySourceIp: 'select sum(packets) as value, sourceip as id\n'
            + ' from :pcapName\n'
            + '/*where*/'
            + ' group by id\n'
            + ' order by value desc'
            + ' limit 10',
    octetsBySourcePort: 'select sourceport as id, sum(packets) as value\n'
        + 'from :pcapName\n'
        + '/*where*/\n'
        + 'group by id\n'
        + 'order by value desc\n'
        + 'limit 10\n',
    destinationToSource: 'select sourceip as x, destinationip as y, sum(packets) as z from :pcapName /*where*/ group by x, y order by z desc limit 10',
  },
};

export default class ConversationMetaDataFactory {
  /**
     * Provides full copy of metadata, queries are copied too
     * @param queryType
     * @returns {Object}
     */
  static create(queryType, bucketized) {
    const metaData = ConversationMetaDataFactory.copyMetaData();
    ConversationMetaDataFactory.assignQueries(metaData, queryType, bucketized);
    return metaData;
  }

  static assignQueries(metaData, queryType, bucketized) {
    const { metaDataMap } = metaData;
    const queries = getQuerySet();
    Object.keys(metaDataMap).forEach((dataKey) => {
      metaDataMap[dataKey].query = queries[dataKey].slice(0);
    });

    function getQuerySet() {
      if (queryType === 'packets' && bucketized) return querySet.packetsBucketized;
      return querySet[queryType];
    }
  }

  static copyMetaData() { // Works only with simple properties
    return JSON.parse(JSON.stringify(metaDataSkeleton));
  }
}
