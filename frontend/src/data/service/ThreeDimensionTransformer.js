class ThreeDimensionTransformer {
	constructor (data, map) {
		this.data = data;
		this.id = map.id;
		this.x = map.x;
		this.y = map.y;
	}

	transform () {
		const collectedMap = this._collect();

		return Object.keys(collectedMap).map((key) => ({
			id: key,
			data: collectedMap[key].data
		}));
	}

	_collect () {
		const map = {};
		this.data.forEach((packet) => {
			if (!map.hasOwnProperty(packet[this.id])) {
				map[packet[this.id]] = {
					data: []
				};
			}

			map[packet[this.id]].data.push({
				x: packet[this.x],
				y: packet[this.y]
			});
		});
		return map;
	}
}

export default ThreeDimensionTransformer;
