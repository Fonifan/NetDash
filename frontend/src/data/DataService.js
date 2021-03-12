import DataApi from './DataApi';

class DataService {
	constructor (pcapName) {
		this.pcapName = pcapName;
	}

	getBatch (metaData) {
		Object.values(metaData.metaDataMap).forEach(this.addPcapName.bind(this));
		return DataApi.getBatch(metaData).then(this.stripData);
	}

	stripData (data) {
		const dataObject = {};
		Object.keys(data).forEach(key => {
			dataObject[key] = data[key].data;
		});
		return dataObject;
	}

	addPcapName (metaData) {
		metaData.pcapName = this.pcapName;
		return metaData;
	}
}

export default DataService;
