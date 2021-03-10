import Api from '../util/Api';

const dataUrl = 'data';

class DataApi {
	static getData (metaData) {
		return Api.post(dataUrl, metaData);
	}
}

export default DataApi;
