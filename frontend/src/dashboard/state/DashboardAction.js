import { createAction } from '@reduxjs/toolkit';

const moduleName = 'dashboard';

const setDatasource = createAction(`@${moduleName}/SET_DATASOURCE`);

export {
	setDatasource
};
