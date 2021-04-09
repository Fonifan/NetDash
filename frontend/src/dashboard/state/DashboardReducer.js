import { createReducer } from '@reduxjs/toolkit';
import { setDatasource } from './DashboardAction';

const initialState = {
  conversation: {
    datasource: {},
  },
};

const dashboardReducer = createReducer(initialState, {
  [setDatasource]: setDatasourceAction,
});

function setDatasourceAction(state, action) {
  const {
    name,
    datasource,
  } = action.payload;
  if (name && datasource) {
    state[name].datasource = datasource;
  }
}

export default dashboardReducer;
