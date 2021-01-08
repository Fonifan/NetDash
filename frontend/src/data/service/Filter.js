class Filter {
	constructor (filters) {
		this.startDate = filters.startDate;
		this.endDate = filters.endDate;
	}

	filter (data) {
		const checks = this._getTimeChecks();
		return data.filter((element) => {
			for (let i = 0; i < checks.length; i++) {
				if (!checks[i](element)) {
					return false;
				}
			}
			return true;
		});
	}

	_getTimeChecks () {
		const checks = [];

		if (this.startDate) {
			checks.push((element) => {
				return element.packetTime >= this.startDate;
			});
		}
		if (this.endDate) {
			checks.push((element) => {
				return element.packetTime <= this.endDate;
			});
		}

		return checks;
	}
}

export default Filter;