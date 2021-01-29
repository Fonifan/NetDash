import SyncTimeBucket from '../../../data/service/SyncTimeBucket';

const dataToSync = [
	{
		id: '192.168.0.1',
		data: [
			{
				x: new Date('2020-01-03T12:00:00').getTime(),
				y: 10
			},
			{
				x: new Date('2020-01-03T12:00:01').getTime(),
				y: 10
			},
			{
				x: new Date('2020-01-03T12:00:02').getTime(),
				y: 10
			}
		]
	},
	{
		id: '192.168.0.2',
		data: [
			{
				x: new Date('2020-01-03T12:00:01').getTime(),
				y: 10
			},
			{
				x: new Date('2020-01-03T12:00:02').getTime(),
				y: 10
			},
			{
				x: new Date('2020-01-03T12:01:00').getTime(),
				y: 10
			}
		]
	}
];

const expectedSyncedData = [
	{
		id: '192.168.0.1',
		data: [
			{
				x: new Date('2020-01-03T12:00:00').getTime(),
				y: 30
			}
		]
	},
	{
		id: '192.168.0.2',
		data: [
			{
				x: new Date('2020-01-03T12:00:00').getTime(),
				y: 20
			},
			{
				x: new Date('2020-01-03T12:01:00').getTime(),
				y: 10
			}
		]
	}
];

const map = {
	label: 'x',
	value: 'y'
};

const bucketLength = 10000;

test('Test synced time bucketing', () => {
	expect(new SyncTimeBucket(dataToSync, map, bucketLength).make()).toStrictEqual(expectedSyncedData);
});
