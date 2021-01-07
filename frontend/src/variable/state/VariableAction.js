import { createAction } from '@reduxjs/toolkit';

const moduleName = 'variable';

const addVariable = createAction(`@${moduleName}/ADD_VARIABLE`);
const removeVariable = createAction(`@${moduleName}/REMOVE_VARIABLE`);

export {
	addVariable,
	removeVariable
};
