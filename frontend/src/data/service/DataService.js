import makeBuckets from './TimeBucket';
import TwoDimensionTransformer from './TwoDimensionTransformer';
import Filter from './Filter';
import ThreeDimensionTransformer from './ThreeDimensionTransformer';

class DataService {
	constructor (data, variables) {
		this.data = data;
		if (!isDataSorted()) {
			console.error('Data is not sorted', data);
		}
		this.startDate = variables.startDate;
		this.endDate = variables.endDate;
		this.bucketLengthMs = 10000;

		function isDataSorted () {
			if (!data) { return true; }
			for (let i = 0; i < data.length - 1; i++) {
				if (data[i].packetTime > data[i + 1].packetTime) {
					return false;
				}
			}

			return true;
		}
	}

	getTimeLine () {
		if (!this.data) {
			return [];
		}
		const buckets = makeBuckets(
			this.data,
			{
				label: 'packetTime',
				value: 'octets'
			},
			this.bucketLengthMs);

		return buckets.map((element) => ({
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
			this._applyMetadata(metadataMap[key], transformedData);
			map[key] = transformedData;
		});
		return map;
	}

	_applyMetadata (map, data) {
		if (map) {
			this._bucketize(map.bucket, data);
		}
	}

	_bucketize (map, data) {
		if (map) {
			makeBuckets(data, map, this.bucketLengthMs);
		}
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
