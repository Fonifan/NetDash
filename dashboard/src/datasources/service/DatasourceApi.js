import Api from '../../util/Api';

const datasourceUrl = 'datasource';

class DatasourceApi {
	static get (id) {
		const url = id ? datasourceUrl + `/${id}` : datasourceUrl;
		return Api.get(url);
	}
}

export default DatasourceApi;
