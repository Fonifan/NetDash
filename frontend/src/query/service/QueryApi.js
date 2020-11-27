import Api from '../../util/Api';

const queryUrl = 'query';

class QueryApi {
	static execute (queryMetadata) {
		return Api.post(queryUrl, { ...queryMetadata });
	}
}

export default QueryApi;
