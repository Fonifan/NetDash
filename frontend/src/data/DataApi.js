import Api from '../util/Api';

const dataUrl = 'data';

class DataApi {
	static getData (metaData) {
		return Api.post(dataUrl, metaData);
	}

	static getBatch (metaData) {
		return Api.post(dataUrl + '/batch', metaData);
	}
}

export default DataApi;
