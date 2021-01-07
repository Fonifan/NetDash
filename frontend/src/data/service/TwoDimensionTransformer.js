class TwoDimensionTransformer {
	constructor (data, map) {
		this.data = data;
		this.map = map;
	}

	transform () {
		const groupedData = this._groupBy(...Object.values(this.map));
		return this._transform(this.map, groupedData);
	}

	_groupBy (by, value) {
		const map = {};
		this.data.forEach((packet) => {
			if (!map.hasOwnProperty(packet[by])) {
				map[packet[by]] = 0;
			}
			map[packet[by]] += packet[value];
		});
		return Object.entries(map);
	}

	_transform (map, data) {
		const dataMap = [];
		const key = Object.keys(map)[0];
		const value = Object.keys(map)[1];
		data.forEach((element) => {
			dataMap.push({
				[key]: element[0],
				[value]: element[1]
			});
		});
		return dataMap;
	}
}

export default TwoDimensionTransformer;
