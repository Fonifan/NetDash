import { createReducer } from '@reduxjs/toolkit';
import { setDatasource, setQueryType } from './DashboardAction';

const initialState = {
  conversation: {
    datasource: {},
    queryType: 'octets',
  },
};

const dashboardReducer = createReducer(initialState, {
  [setDatasource]: setDatasourceAction,

  [setQueryType]: setQueryTypeAction,
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

function setQueryTypeAction(state, action) {
  const {
    name,
    type,
  } = action.payload;
  if (name && type) {
    state[name].queryType = type;
  }
}

export default dashboardReducer;
