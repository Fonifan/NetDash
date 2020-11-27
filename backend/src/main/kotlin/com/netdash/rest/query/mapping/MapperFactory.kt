package com.netdash.rest.query.mapping

import com.netdash.rest.query.mapping.serialization.Mapping

class MapperFactory {
     fun create(mapping: Mapping): Mapper = when (mapping.type) {
        MappingType.FLAT -> FlatMapper(mapping.variables)
        MappingType.LINE_CHART -> LineChartMapper(mapping.variables)
    }
}
