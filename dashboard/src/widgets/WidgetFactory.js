import PieChart from './components/PieChart';
import React from 'react';
import { WidgetName } from './Constant';
import BarChart from './components/BarChart';

const Widgets = {
	[WidgetName.PIE]: {
		minSize: {
			col: 3,
			row: 4
		},
		name: 'Pie'
	},
	[WidgetName.BAR]: {
		minSize: {
			col: 4,
			row: 5
		},
		name: 'Bar'
	}
};

function create (name, props) {
	switch (name) {
	case WidgetName.PIE:
		return <PieChart data={props.data}/>;
	case WidgetName.BAR:
		return <BarChart data={props.data}/>;
	default:
		return null;
	}
}

export { create, Widgets };
