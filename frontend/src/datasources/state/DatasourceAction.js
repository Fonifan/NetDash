import { createAction } from '@reduxjs/toolkit';

const moduleName = 'datasource';

const addDatasource = createAction(`@${moduleName}/ADD_DATASOURCE`);
const removeDatasource = createAction(`@${moduleName}/REMOVE_DATASOURCE`);
const editDatasource = createAction(`@${moduleName}/EDIT_DATASOURCE`);
const setDatasources = createAction(`@${moduleName}/SET_DATASOURCES`);

export {
	addDatasource,
	removeDatasource,
	editDatasource,
	setDatasources
};
