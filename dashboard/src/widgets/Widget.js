import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { create } from './WidgetFactory';
import StorageIcon from '@material-ui/icons/Storage';
import IconButton from '@material-ui/core/IconButton';
import QuerySettingsDialog from '../query/QuerySettingsDialog';
import QueryService from '../query/service/QueryService';

const useStyles = createUseStyles({
	item: props => ({
		gridColumnStart: props.colStart,
		gridColumnEnd: props.colEnd,
		gridRowStart: props.rowStart,
		gridRowEnd: props.rowEnd,
		display: 'flex',
		flexDirection: 'column'
	}),
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		textAlign: 'center'
	},
	body: {
		height: '80%'
	}
});

function Widget (props) {
	const { name, size, type, mapping } = props.metadata;
	const classes = useStyles(size);
	const [data, setData] = useState(null);
	const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
	const [queryMetadata, setQueryMetadata] = useState();
	useEffect(() => {
		if (queryMetadata) {
			QueryService.execute(queryMetadata).then(setData);
		}
	}, [queryMetadata]);
	if (data === null) {
		setData([
			{
				id: 'a',
				label: 'a',
				value: 101
			},
			{
				id: 'b',
				label: 'b',
				value: 10
			},
			{
				id: 'c',
				label: 'c',
				value: 200
			}
		]);
	}
	const component = create(type, { data });
	return (
		<div className={classes.item}>
			<div className={classes.header}>
				<InputBase defaultValue={name}/>
				<IconButton onClick={() => setSettingsDialogOpen(true)}>
					<StorageIcon/>
				</IconButton>
			</div>
			<div className={classes.body}>
				{component}
			</div>
			<QuerySettingsDialog
				mapping={mapping}
				open={settingsDialogOpen}
				onClose={() => setSettingsDialogOpen(false)}
				onApply={(datasource) => setQueryMetadata(datasource)}/>
		</div>);
}

Widget.propTypes = {
	size: PropTypes.object,
	component: PropTypes.element
};

export default Widget;
