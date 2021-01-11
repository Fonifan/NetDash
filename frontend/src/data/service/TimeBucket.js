function makeBuckets (data, map, length) {
	const { label, value } = map;
	const bucketizedData = [];
	let startPoint = data[0][label];
	let aggregate = 0;

	data.forEach((element) => {
		if (element[label] <= startPoint + length) {
			aggregate += element[value];
		} else {
			pushBucket(startPoint, aggregate);
			startPoint = element[label];
			aggregate = element[value];
		}
	});

	pushBucket(startPoint, aggregate);

	return bucketizedData;

	function pushBucket (time, aggregate) {
		bucketizedData.push({
			[label]: time,
			[value]: aggregate
		});
	}
}

export default makeBuckets;
