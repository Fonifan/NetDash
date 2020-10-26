import QueryApi from './QueryApi';
import QueryMetadataSerializer from './QueryMetadataSerializer';

class QueryService {
	static execute (queryMetadata) {
		return QueryApi.execute(QueryMetadataSerializer.serialize(queryMetadata));
	}
}

export default QueryService;
