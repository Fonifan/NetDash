import { createAction } from '@reduxjs/toolkit';

const moduleName = 'dashboard';

const setDatasource = createAction(`@${moduleName}/SET_DATASOURCE`);
const setQueryType = createAction(`@${moduleName}/SET_QUERY_TYPE`);
export {
  setDatasource,
  setQueryType,
};
