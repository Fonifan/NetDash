import PieChart from './components/PieChart';
import React from 'react';
import BarChart from './components/BarChart';
import Constant from '../Constant';
import WaffleChart from './components/WaffleChart';

const Widgets = {
	[Constant.WidgetName.PIE]: {
		minSize: {
			col: 4,
			row: 4
		},
		name: 'Pie',
		mapping: [
			'id',
			'value'
		]
	},
	[Constant.WidgetName.BAR]: {
		minSize: {
			col: 5,
			row: 6
		},
		name: 'Bar',
		mapping: [
			'id',
			'value'
		]
	},
	[Constant.WidgetName.WAFFLE]: {
		minSize: {
			col: 5,
			row: 6
		},
		name: 'Waffle',
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
	case Constant.WidgetName.WAFFLE:
		return <WaffleChart data={props.data}/>;
	default:
		return null;
	}
}

export { create, Widgets };
