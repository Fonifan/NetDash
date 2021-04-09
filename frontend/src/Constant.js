const VariableName = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
};

const HostPath = {
  API: process.env.REACT_APP_HOST_PATH
    ? `${process.env.REACT_APP_HOST_PATH}/api/`
    : 'http://localhost:8080/api/',
};

export {
  VariableName, HostPath,
};
