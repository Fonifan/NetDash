import PieChart from './components/PieChart';
import React from 'react';
import BarChart from './components/BarChart';
import { WidgetName, MapperName } from '../Constant';
import WaffleChart from './components/WaffleChart';
import LineChart from './components/LineChart';

const Widgets = {
	[WidgetName.PIE]: {
		minSize: {
			col: 4,
			row: 4
		},
		name: 'Pie',
		mapping: {
			type: MapperName.FLAT,
			variables: [
				'id',
				'value',
				'label'
			]
		}
	},
	[WidgetName.BAR]: {
		minSize: {
			col: 5,
			row: 6
		},
		name: 'Bar',
		mapping: {
			type: MapperName.FLAT,
			variables: [
				'id',
				'value',
				'label'
			]
		}
	},
	[WidgetName.WAFFLE]: {
		minSize: {
			col: 5,
			row: 6
		},
		name: 'Waffle',
		mapping: {
			type: MapperName.FLAT,
			variables: [
				'id',
				'value',
				'label'
			]
		}
	},
	[WidgetName.LINE]: {
		minSize: {
			col: 9,
			row: 5
		},
		name: 'Line',
		mapping: {
			type: MapperName.LINE_CHART,
			variables: [
				'id',
				'x',
				'y'
			]
		}
	}
};

function create (name, props) {
	switch (name) {
	case WidgetName.PIE:
		return <PieChart data={props.data}/>;
	case WidgetName.BAR:
		return <BarChart data={props.data}/>;
	case WidgetName.WAFFLE:
		return <WaffleChart data={props.data}/>;
	case WidgetName.LINE:
		return <LineChart data={props.data}/>;
	default:
		return null;
	}
}

export { create, Widgets };
