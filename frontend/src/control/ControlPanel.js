import React from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import TimeLineWidget from './widget/TimeLineWidget';
import VariableList from '../variable/presenter/VariableList';
import { addVariables } from '../variable/state/VariableAction';
import DatasourceSelectPopover from './widget/DatasourceSelectPopover';
import { VariableName } from '../Constant';

const useStyles = createUseStyles({
  panel: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px',
    paddingLeft: '20px',
  },
});

function ControlPanel(props) {
  const {
    addVariables,
  } = props;

  const classes = useStyles();

  const onDomainChange = (domain) => {
    addVariables([
      {
        name: VariableName.START_DATE,
        value: domain.x[0].getTime(),
      },
      {
        name: VariableName.END_DATE,
        value: domain.x[1].getTime(),
      },
    ]);
  };

  return (
    <div className={classes.panel}>
      <DatasourceSelectPopover selectedDatasource={props.selectedDatasource} onSubmit={props.onSetSelectedDatasource} datasources={props.datasources} />
      <TimeLineWidget onDomainChange={onDomainChange} height={props.height} width={props.width} data={props.data} />
      <VariableList />
    </div>
  );
}

export default connect(
  (state) => ({
    variables: state.variable.variables,
  }),
  {
    addVariables,
  },
)(ControlPanel);
