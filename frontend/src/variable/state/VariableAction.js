import { createAction } from '@reduxjs/toolkit';

const moduleName = 'variable';

const addVariable = createAction(`@${moduleName}/ADD_VARIABLE`);
const addVariables = createAction(`@${moduleName}/ADD_VARIABLES`);
const removeVariable = createAction(`@${moduleName}/REMOVE_VARIABLE`);
const clearVariables = createAction(`@${moduleName}/CLEAR_VARIABLES`);

export {
  addVariable,
  addVariables,
  removeVariable,
  clearVariables,
};
