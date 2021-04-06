import { createReducer } from '@reduxjs/toolkit';
import { addVariable, addVariables, clearVariables, removeVariable } from './VariableAction';

const initialState = {
	variables: {}
};

const variableReducer = createReducer(initialState, {
	[addVariable]: addVariableAction,

	[addVariables]: addVariablesAction,

	[removeVariable]: removeVariableAction,

	[clearVariables]: clearVariablesAction
});

function addVariableAction (state, action) {
	const {
		name,
		value
	} = action.payload;
	if (name && value) {
		state.variables[name] = value;
	}
}

function addVariablesAction (state, action) {
	if (action.payload) {
		action.payload.forEach((variable) => {
			const {
				name,
				value
			} = variable;

			if (name && value) {
				state.variables[name] = value;
			}
		});
	}
}

function removeVariableAction (state, action) {
	const { name } = action.payload;
	state.variables[name] = null;
}

function clearVariablesAction (state, action) {
	state.variables = {};
}

export default variableReducer;
