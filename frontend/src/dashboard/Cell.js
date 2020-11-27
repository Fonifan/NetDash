import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { CellSize } from '../Constant';

const useStyles = createUseStyles({
	cell: {
		width: `${CellSize}px`,
		height: `${CellSize}px`,
		borderStyle: 'solid',
		borderColor: '#aaaaaa'
	},
	hoverStyle: {
		background: '#c9ffcc'
	}
});

function Cell (props) {
	const { cell, hoverStyle } = useStyles();
	const [hovered, setHovered] = useState(false);
	const myRef = useRef(null);

	return (
		<div
			className={`${cell} + ${hovered ? hoverStyle : ''}`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={() => props.handleClick(props.col, props.row)}
			ref={myRef}>
		</div>);
}

Cell.propTypes = {
	handleClick: PropTypes.func
};

export default Cell;
