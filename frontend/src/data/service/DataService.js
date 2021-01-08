import makeBuckets from './TimeBucket';
import TwoDimensionTransformer from './TwoDimensionTransformer';
import Filter from './Filter';

class DataService {
	constructor (data, variables) {
		this.data = data;
		this.startDate = variables.startDate;
		this.endDate = variables.endDate;
	}

	getTimeLine () {
		const bucketLengthMs = 10000;
		if (!this.data) {
			return [];
		}
		return makeBuckets(this.data.map((packet) => ({
			x: packet.packetTime,
			y: packet.octets
		})), bucketLengthMs);
	}

	getData (dataMap) {
		if (!this.data) {
			return {};
		}
		const map = {};
		Object.keys(dataMap).forEach((key) => {
			const filter = new Filter({
				startDate: this.startDate,
				endDate: this.endDate
			});
			map[key] = this._getTransformer(dataMap[key], filter.filter(this.data)).transform();
		});
		return map;
	}

	_getTransformer (map, data) {
		const mapLength = Object.keys(map).length;

		switch (mapLength) {
		case 2:
			return new TwoDimensionTransformer(data, map);
		}

		return null;
	}
}

export default DataService;
