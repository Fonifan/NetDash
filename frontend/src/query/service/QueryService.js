import QueryApi from './QueryApi';

class QueryService {
	static execute (queryMetadata) {
		return QueryApi.execute(queryMetadata);
	}
}

export default QueryService;
