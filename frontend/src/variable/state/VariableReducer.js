import { createReducer } from '@reduxjs/toolkit';
import {
  addVariable, addVariables, clearVariables, removeVariable,
} from './VariableAction';

const initialState = {
  variables: [],
};

const variableReducer = createReducer(initialState, {
  [addVariable]: addVariableAction,

  [addVariables]: addVariablesAction,

  [removeVariable]: removeVariableAction,

  [clearVariables]: clearVariablesAction,
});
function isOverrideVariable(name) {
  const overrideVariables = [
    'startDate',
    'endDate',
  ];
  return overrideVariables.includes(name) || name.startsWith('only_');
}

function internalAddVariable(state, variable) {
  const {
    name,
    value,
  } = variable;
  if (name) {
    if (isOverrideVariable(name)) {
      state.variables = state.variables.filter((v) => v.name !== variable.name);
    }
    state.variables.push({ name, value });
  }
}

function addVariableAction(state, action) {
  internalAddVariable(state, action.payload);
}

function addVariablesAction(state, action) {
  if (action.payload) {
    action.payload.forEach((variable) => {
      internalAddVariable(state, variable);
    });
  }
}

function removeVariableAction(state, action) {
  const { name, value } = action.payload;
  state.variables = state.variables.filter((v) => !(v.name === name && v.value === value));
}

function clearVariablesAction(state, action) {
  if (state.variables.length !== 0) { state.variables = []; }
}

export default variableReducer;
