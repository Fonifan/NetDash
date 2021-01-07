import DataService from '../../../data/service/DataService';

const data = [
	{
		x: 'a',
		y: 10
	},
	{
		x: 'a',
		y: 10
	},
	{
		x: 'a',
		y: 10
	},
	{
		x: 'a',
		y: 10
	},
	{
		x: 'b',
		y: 10
	},
	{
		x: 'b',
		y: 10
	}
];

const expected = {
	data: [
		{
			label: 'a',
			value: 40
		},
		{
			label: 'b',
			value: 20
		}
	]
};

test('Test map', () => {
	const service = new DataService(data, {});
	const dataMap = {
		data: {
			label: 'x',
			value: 'y'
		}
	};

	expect(service.getData(dataMap)).toStrictEqual(expected);
});
