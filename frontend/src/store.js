import { configureStore, combineReducers } from '@reduxjs/toolkit';
import datasourceReducer from './datasources/state/DatasourceReducer';
import variableReducer from './variable/state/VariableReducer';

const rootReducer = combineReducers({
	datasource: datasourceReducer,
	variable: variableReducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;
