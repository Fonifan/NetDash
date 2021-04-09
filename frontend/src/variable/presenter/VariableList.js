import React from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { List, ListItem } from '@chakra-ui/react';
import { addVariable, removeVariable } from '../state/VariableAction';
import VariablePrinter from '../service/VariablePrinter';

const useStyles = createUseStyles({
  list: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '125px',
    flexDirection: 'column',
  },
  item: {
    padding: '5px',
    border: 'dashed',
    borderWidth: '1px',
  },
});

function VariableList(props) {
  const { variables } = props;
  const classes = useStyles();
  return (
    <div>
      <List className={classes.list}>
        {variables ? variables.map((variable) => <ListItem className={classes.item} key={variable.value}>{VariablePrinter.print(variable)}</ListItem>) : null}
      </List>
    </div>
  );
}

export default connect(
  (state) => ({
    variables: state.variable.variables,
  }),
  {
    addVariable,
    removeVariable,
  },
)(VariableList);
