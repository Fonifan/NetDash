import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard/state/DashboardReducer';
import datasourceReducer from './datasources/state/DatasourceReducer';

const rootReducer = combineReducers({
	dashboard: dashboardReducer,
	datasource: datasourceReducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;
