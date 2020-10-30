class QueryMetadataSerializer {
	static serialize (queryMetadata) {
		const serialized = {};
		serialized.mapping = QueryMetadataSerializer.serializeMapping(queryMetadata.mapping);
		serialized.datasourceId = queryMetadata.datasourceId;
		serialized.query = queryMetadata.query;
		return serialized;
	}

	static serializeMapping (mapping) {
		const serialiazed = [];
		Object.keys(mapping).forEach((key) => {
			serialiazed.push({
				source: mapping[key],
				target: key
			});
		});
		return serialiazed;
	}
}

export default QueryMetadataSerializer;
