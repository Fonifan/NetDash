import TimeBucket from '../../../data/service/TimeBucket';

const bucketLength = 5000;
const data = [
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
	},
	{
		x: new Date('2020-01-03T12:01:00').getTime(),
		y: 10
	},
	{
		x: new Date('2020-01-03T12:01:01').getTime(),
		y: 10
	},
	{
		x: new Date('2020-01-03T12:01:02').getTime(),
		y: 10
	}
];
const expectedData = [
	{
		x: new Date('2020-01-03T12:00:00').getTime(),
		y: 30
	},
	{
		x: new Date('2020-01-03T12:01:00').getTime(),
		y: 30
	}
];

const map = {
	label: 'x',
	value: 'y'
};

test('Test time bucketing', () => {
	expect(new TimeBucket(data, map, bucketLength).make()).toStrictEqual(expectedData);
});

// test('All time buckets times are multiples of start bucket time', () => {
// 	const buckets = new TimeBucket(data, map, bucketLength).make();
// 	expect();
// });
