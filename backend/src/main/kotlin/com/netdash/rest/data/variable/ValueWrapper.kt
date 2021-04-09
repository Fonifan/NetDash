package com.netdash.rest.data.variable

class ValueWrapper {
    private val wrapperSet = setOf(
        "sourceip",
        "destinationip",
    )

    fun wrap(columnName: String, value: Any): Any {
        if(wrapperSet.contains(columnName))
            return "'${value}'"
        return value
    }

}
