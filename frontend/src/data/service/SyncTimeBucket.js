class SyncTimeBucket {
	constructor (data, map, length) {
		this.data = data;
		this.label = map.label;
		this.value = map.value;
		this.length = length;
	}

	sync () {
		// TODO: sync buckets across different data groups
	}
}

export default SyncTimeBucket;
