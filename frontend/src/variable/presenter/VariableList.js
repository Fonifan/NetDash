import React from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { addVariable, removeVariable } from '../state/VariableAction';
import VariablePrinter from '../service/VariablePrinter';

const useStyles = createUseStyles({
	list: {
		listStyleType: 'none'
	}
});

function VariableList (props) {
	const { variables } = props;
	const classes = useStyles();

	return (
		<div>
			<ul className={classes.list}>
				{Object.entries(variables).map((variable) => <li key={variable[0]}>{VariablePrinter.print(variable)}</li>)}
			</ul>
		</div>
	);
}

export default connect(
	(state) => ({
		variables: state.variable.variables
	}),
	{
		addVariable,
		removeVariable
	}
)(VariableList);
