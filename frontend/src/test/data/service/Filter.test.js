import Filter from '../../../data/service/Filter';

const data = [
	{
		packetTime: new Date('2020-02-01T12:00:01').getTime()
	},
	{
		packetTime: new Date('2020-02-01T12:00:02').getTime()
	},
	{
		packetTime: new Date('2020-02-01T12:00:03').getTime()
	},
	{
		packetTime: new Date('2020-02-01T12:00:04').getTime()
	},
	{
		packetTime: new Date('2020-02-01T12:00:05').getTime()
	},
	{
		packetTime: new Date('2020-02-01T12:00:06').getTime()
	}
];

const expected = [
	{
		packetTime: new Date('2020-02-01T12:00:01').getTime()
	},
	{
		packetTime: new Date('2020-02-01T12:00:02').getTime()
	},
	{
		packetTime: new Date('2020-02-01T12:00:03').getTime()
	}
];

test('Filter test', () => {
	const filter = new Filter({
		startDate: new Date('2020-02-01T12:00:00').getTime(),
		endDate: new Date('2020-02-01T12:00:03').getTime()
	});

	expect(filter.filter(data)).toStrictEqual(expected);
});
