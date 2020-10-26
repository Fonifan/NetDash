import PieChart from './components/PieChart';
import React from 'react';
import BarChart from './components/BarChart';
import Constant from '../Constant';

const Widgets = {
	[Constant.WidgetName.PIE]: {
		minSize: {
			col: 3,
			row: 3
		},
		name: 'Pie',
		mapping: [
			'id',
			'value'
		]
	},
	[Constant.WidgetName.BAR]: {
		minSize: {
			col: 4,
			row: 5
		},
		name: 'Bar',
		mapping: [
			'id',
			'value'
		]
	}
};

function create (name, props) {
	switch (name) {
	case Constant.WidgetName.PIE:
		return <PieChart data={props.data}/>;
	case Constant.WidgetName.BAR:
		return <BarChart data={props.data}/>;
	default:
		return null;
	}
}

export { create, Widgets };
