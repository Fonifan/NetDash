import { configureStore, combineReducers } from '@reduxjs/toolkit';
import datasourceReducer from './datasources/state/DatasourceReducer';
import variableReducer from './variable/state/VariableReducer';
import dashboardReducer from './dashboard/state/DashboardReducer';

const rootReducer = combineReducers({
	datasource: datasourceReducer,
	variable: variableReducer,
	dashboard: dashboardReducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;
