import DatasourceApi from './DatasourceApi';

class DatasourceService {
	static getAll () {
		return DatasourceApi.get();
	}
}

export default DatasourceService;
