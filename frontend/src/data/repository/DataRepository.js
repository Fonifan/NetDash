const datasources = {};

class DataRepository {
	static add (datasource) {
		datasources[datasource.id] = datasource.data;
	}

	static get (id) {
		return datasources[id];
	}
}

export default DataRepository;
