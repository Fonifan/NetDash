import TwoDimensionTransformer from '../../../data/service/TwoDimensionTransformer';

const data = [
	{
		sourceIp: '192.168.0.1',
		octets: 100
	},
	{
		sourceIp: '192.168.0.2',
		octets: 100
	},
	{
		sourceIp: '192.168.0.2',
		octets: 100
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100
	},
	{
		sourceIp: '192.168.0.3',
		octets: 100
	}
];

const map = {
	id: 'sourceIp',
	value: 'octets'
};

const expected = [
	{
		id: '192.168.0.1',
		value: 100
	},
	{
		id: '192.168.0.2',
		value: 200
	},
	{
		id: '192.168.0.3',
		value: 300
	}
];

test('Test two dimension transformation', () => {
	const transformer = new TwoDimensionTransformer(data, map);
	expect(transformer.transform()).toStrictEqual(expected);
});
