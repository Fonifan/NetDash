function makeBuckets (data, length) {
	const bucketizedData = [];
	let startPoint = data[0].x;
	let aggregate = 0;

	data.forEach(({
		x,
		y
	}) => {
		if (x <= startPoint + length) {
			aggregate += y;
		} else {
			pushBucket(startPoint, aggregate);
			startPoint = x;
			aggregate = y;
		}
	});

	pushBucket(startPoint, aggregate);

	return bucketizedData;

	function pushBucket (time, aggregate) {
		bucketizedData.push({
			x: time,
			y: aggregate
		});
	}
}

export default makeBuckets;
