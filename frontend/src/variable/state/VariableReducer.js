import { createReducer } from '@reduxjs/toolkit';
import { addVariable, removeVariable } from './VariableAction';

const initialState = {
	variables: {

	}
};

const variableReducer = createReducer(initialState, {
	[addVariable]: addVariableAction,

	[removeVariable]: removeVariableAction
});

function addVariableAction (state, action) {
	const { name, value } = action.payload;
	if (name && value) {
		state.variables[name] = value;
	}
}

function removeVariableAction (state, action) {
	const { name } = action.payload;
	state.variables[name] = null;
}

export default variableReducer;
