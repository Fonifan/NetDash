import { createReducer } from '@reduxjs/toolkit';
import { addDatasource, editDatasource, removeDatasource, setDatasources } from './DatasourceAction';

const initialState = {
	datasources: {}
};

const datasourceReducer = createReducer(initialState, {
	[addDatasource]: addDatasourceAction,

	[removeDatasource]: removeDatasourceAction,

	[editDatasource]: editDatasourceAction,

	[setDatasources]: setDatasourcesAction
});

function addDatasourceAction (state, action) {
	const { datasource } = action.payload;
	if (datasource) {
		state.datasources[datasource.id] = datasource;
	}
}

function removeDatasourceAction (state, action) {
	if (action.payload) {
		delete state.datasources[action.payload];
	}
}

function editDatasourceAction (state, action) {
	const { datasource } = action.payload;
	if (datasource) {
		state.datasources[datasource.id] = { ...state.datasources[datasource.id], ...datasource };
	}
}

function setDatasourcesAction (state, action) {
	const datasources = action.payload;
	if (datasources) {
		state.datasources = datasources;
	}
}

export default datasourceReducer;
