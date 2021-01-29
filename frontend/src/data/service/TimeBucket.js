class TimeBucket {
	constructor (data, map, length) {
		this.data = data;
		this.label = map.label;
		this.value = map.value;
		this.length = length;
		this.bucketized = [];
	}

	make (startPoint) {
		let start = startPoint;
		if (!start) {
			start = this.data[0][this.label];
		} else {
			start = this._getNewStart(this.data[0][this.label], start);
		}
		let aggregate = 0;

		this.data.forEach((element) => {
			if (element[this.label] <= start + this.length) {
				aggregate += element[this.value];
			} else {
				this._push(start, aggregate);
				start = this._getNewStart(element[this.label], start);
				aggregate = element[this.value];
			}
		});

		this._push(start, aggregate);

		return this.bucketized;
	}

	_push (time, aggregate) {
		this.bucketized.push({
			[this.label]: time,
			[this.value]: aggregate
		});
	}

	_getNewStart (time, start) {
		if (time === start) {
			return start;
		}
		if (start + this.length >= time) { return start + this.length; }
		return Math.floor((time - start) / this.length) * this.length + start;
	}
}

export default TimeBucket;
