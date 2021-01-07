class Filter {
	constructor (filters) {
		this.startDate = filters.startDate;
		this.endDate = filters.endDate;
	}

	filter (data) {
		const checks = this._getTimeChecks();
		return data.filter((element) => {
			let passed = true;
			for (let i = 0; i < checks.length; i++) {
				passed = checks[i](element);
			}
			return passed;
		});
	}

	_getTimeChecks () {
		const checks = [];

		if (this.startDate) {
			checks.push((element) => element.packetTime >= this.startDate);
		}
		if (this.endDate) {
			checks.push((element) => element.packetTime <= this.endDate);
		}

		return checks;
	}
}

export default Filter;
