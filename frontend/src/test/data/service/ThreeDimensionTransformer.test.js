import makeBuckets from '../../../data/service/TimeBucket';
import ThreeDimensionTransformer from '../../../data/service/ThreeDimensionTransformer';

const data = [
	{
		sourceIp: '192.168.0.1',
		octets: 100,
		packetTime: new Date('2020-01-01T12:00:01').getTime()
	},
	{
		sourceIp: '192.168.0.2',
		octets: 100,
		packetTime: new Date('2020-01-01T12:00:02').getTime()
	},
	{
		sourceIp: '192.168.0.2',
		octets: 100,
		packetTime: new Date('2020-01-01T12:00:03').getTime()
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100,
		packetTime: new Date('2020-01-01T12:00:04').getTime()
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100,
		packetTime: new Date('2020-01-01T12:00:05').getTime()
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100,
		packetTime: new Date('2020-01-01T12:00:06').getTime()
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100,
		packetTime: new Date('2020-01-01T12:01:00').getTime()
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100,
		packetTime: new Date('2020-01-01T12:01:01').getTime()
	}
];

const dataMap = {
	id: 'sourceIp',
	x: 'packetTime',
	y: 'octets'
};

const expected = [
	{
		id: '192.168.0.1',
		data: [
			{
				x: new Date('2020-01-01T12:00:01').getTime(),
				y: 100
			}
		]
	},
	{
		id: '192.168.0.2',
		data: [
			{
				y: 100,
				x: new Date('2020-01-01T12:00:02').getTime()
			},
			{
				y: 100,
				x: new Date('2020-01-01T12:00:03').getTime()
			}
		]
	},
	{
		id: '192.168.0.3',
		data: [
			{
				y: 100,
				x: new Date('2020-01-01T12:00:04').getTime()
			},
			{
				y: 100,
				x: new Date('2020-01-01T12:00:05').getTime()
			},
			{
				y: 100,
				x: new Date('2020-01-01T12:00:06').getTime()
			},
			{
				y: 100,
				x: new Date('2020-01-01T12:01:00').getTime()
			},
			{
				y: 100,
				x: new Date('2020-01-01T12:01:01').getTime()
			}
		]
	}
];

test('3d', () => {
	expect(new ThreeDimensionTransformer(data, dataMap).transform()).toStrictEqual(expected);
});
