import TimeBucket from './TimeBucket';
import TwoDimensionTransformer from './TwoDimensionTransformer';
import Filter from './Filter';
import ThreeDimensionTransformer from './ThreeDimensionTransformer';

class DataService {
	constructor (data, variables) {
		this.data = data;
		this.startDate = variables.startDate;
		this.endDate = variables.endDate;
		this.bucketLengthMs = 10000;
	}

	getTimeLine () {
		if (!this.data) {
			return [];
		}
		const bucket = new TimeBucket(this.data, {
			label: 'packetTime',
			value: 'octets'
		}, this.bucketLengthMs);

		return bucket.make().map((element) => ({
			x: element.packetTime,
			y: element.octets
		}));
	}

	getData (dataMap, metadataMap) {
		if (!this.data) {
			return {};
		}
		const map = {};
		Object.keys(dataMap).forEach((key) => {
			const filter = new Filter({
				startDate: this.startDate,
				endDate: this.endDate
			});
			const filteredData = filter.filter(this.data);
			const transformedData = this._getTransformer(dataMap[key], filteredData).transform();
			map[key] = this._applyMetadata(metadataMap[key], transformedData);
		});
		return map;
	}

	_applyMetadata (map, data) {
		if (map) {
			return this._bucketize(map.bucket, data);
		}
		return data;
	}

	_bucketize (map, data) {
		if (map) {
			return new TimeBucket(data, map, this.bucketLengthMs).make();
		}

		return data;
	}

	_getTransformer (map, data) {
		const mapLength = Object.keys(map).length;

		switch (mapLength) {
		case 2:
			return new TwoDimensionTransformer(data, map);

		case 3:
			return new ThreeDimensionTransformer(data, map);
		}
		return null;
	}
}

export default DataService;
