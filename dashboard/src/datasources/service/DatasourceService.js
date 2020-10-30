import DatasourceApi from './DatasourceApi';

class DatasourceService {
	static getAll () {
		return DatasourceApi.get();
	}

	static add (datasource) {
		return DatasourceApi.add(datasource);
	}
}

export default DatasourceService;
