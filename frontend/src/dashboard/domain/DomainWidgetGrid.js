import React from 'react';
import { createUseStyles } from 'react-jss';
import BarChart from '../../widgets/components/BarChart';

const fractionAmount = 12;

const useStyles = createUseStyles({
	grid: {
		height: 'calc(100% - 200px)',
		display: 'grid',
		gridTemplateColumns: `repeat(${fractionAmount}, 1fr)`,
		gridTemplateRows: `repeat(${fractionAmount}, 1fr)`
	},
	requestsByClient: {
		gridRowStart: 1,
		gridRowEnd: 8,
		gridColumnStart: 1,
		gridColumnEnd: 7
	},
	domainByRequests: {
		gridRowStart: 1,
		gridRowEnd: 8,
		gridColumnStart: 7,
		gridColumnEnd: 13
	},
	alexaByRequests: {
		gridRowStart: 8,
		gridRowEnd: 13,
		gridColumnStart: 9,
		gridColumnEnd: 13
	},
	statusesByRequest: {
		gridRowStart: 8,
		gridRowEnd: 13,
		gridColumnStart: 1,
		gridColumnEnd: 5
	},
	categoriesByRequest: {
		gridRowStart: 8,
		gridRowEnd: 13,
		gridColumnStart: 5,
		gridColumnEnd: 9
	}
});

function DomainWidgetGrid (props) {
	const classes = useStyles();
	const {
		requestsByClient,
		statusesByRequest,
		categoriesByRequest,
		alexaByRequests,
		domainByRequests
	} = props.dataMap;

	return (
		<div className={classes.grid}>
			<div className={classes.requestsByClient}>
				<BarChart data={requestsByClient}/>
			</div>
			<div className={classes.statusesByRequest}>
				<BarChart data={statusesByRequest}/>
			</div>
			<div className={classes.categoriesByRequest}>
				<BarChart data={categoriesByRequest}/>
			</div>
			<div className={classes.alexaByRequests}>
				<BarChart data={alexaByRequests}/>
			</div>
			<div className={classes.domainByRequests}>
				<BarChart data={domainByRequests}/>
			</div>
		</div>
	);
};

export default DomainWidgetGrid;
