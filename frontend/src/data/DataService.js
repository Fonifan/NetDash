import DataApi from './DataApi';

class DataService {
	constructor (pcapName) {
		this.pcapName = pcapName;
	}

	getBatch (metaData, variables) {
		Object.values(metaData.metaDataMap).forEach(this.addPcapName.bind(this));
		if (variables && Object.keys(variables).length !== 0) {
			metaData.variables = { vars: this.prepareVariables(variables) };
		} else {
			metaData.variables = null;
		}
		return DataApi.getBatch(metaData).then(this.stripData);
	}

	stripData (data) {
		const dataObject = {};
		Object.keys(data).forEach(key => {
			if (data[key]) {
				dataObject[key] = data[key].data;
			}
		});
		return dataObject;
	}

	addPcapName (metaData) {
		metaData.pcapName = this.pcapName;
		return metaData;
	}

	prepareVariables (variables) { // TODO: SRP or time library
		const prepared = {};
		Object.keys(variables).forEach((key) => {
			if (key === 'startDate' || key === 'endDate') {
				const timezoneOffset = new Date().getTimezoneOffset();
				prepared[key] = variables[key] + Math.sign(timezoneOffset) * timezoneOffset * 60 * 1000;
			}
		});
		return prepared;
	}
}

export default DataService;
