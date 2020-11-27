package com.netdash.rest.query.mapping.serialization;

import com.netdash.rest.query.mapping.MappingType

data class Mapping(
        val type: MappingType,
        val variables: Map<String, String>
);
