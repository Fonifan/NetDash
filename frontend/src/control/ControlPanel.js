import React from 'react';
import TimeLineWidget from './widget/TimeLineWidget';
import VariableList from '../variable/presenter/VariableList';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { addVariable, removeVariable } from '../variable/state/VariableAction';
import DatasourceSelector from './widget/DatasourceSelector';
import { VariableName } from '../Constant';

const useStyles = createUseStyles({
	panel: {
		display: 'flex',
		flexDirection: 'row'
	}
});

function ControlPanel (props) {
	const {
		addVariable,
		removeVariable
	} = props;

	const classes = useStyles();

	const onDomainChange = (domain) => {
		addVariable({
			name: VariableName.START_DATE,
			value: domain.x[0].getTime()
		});
		addVariable({
			name: VariableName.END_DATE,
			value: domain.x[1].getTime()
		});
	};

	return (
		<div className={classes.panel}>
			<DatasourceSelector onSelected={props.onSetSelectedDatasource} datasources={props.datasources}/>
			<TimeLineWidget onDomainChange={onDomainChange} height={props.height} width={props.width} data={props.data}/>
			<VariableList/>
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
)(ControlPanel);
