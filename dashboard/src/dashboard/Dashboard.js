import React, { useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import { createUseStyles } from 'react-jss';
import { Widgets } from '../widgets/WidgetFactory';
import WidgetModal from '../widgets/WidgetModal';
import Widget from '../widgets/Widget';

const cellSize = 100;

const useStyles = createUseStyles({
	grid: props => ({
		height: '95vh',
		display: 'grid',
		gridTemplateColumns: `repeat(${props.cellsCount}, ${cellSize}px)`,
		gridTemplateRows: `repeat(${props.rowsCount}, ${cellSize}px)`
	})
});

function Dashboard () {
	const myRef = useRef(null);
	const [cellsCount, setCellsCount] = useState(0);
	const [rowsCount, setRowsCount] = useState(0);
	const [components, setComponents] = useState([]);
	const [widgetModalOpen, setWidgetModalOpen] = useState(false);
	const [selectedCell, setSelectedCell] = useState(null);

	useEffect(() => {
		setCellsCount(Math.floor(myRef.current.clientWidth / cellSize));
		setRowsCount(Math.floor(myRef.current.clientHeight / cellSize));
	}, []);

	const classes = useStyles({
		cellsCount,
		rowsCount
	});

	const handleCellClick = (col, row) => {
		setSelectedCell({ col, row });
		setWidgetModalOpen(true);
	};

	const cells = [];
	const dirtyCoords = renderComponents(cells);
	renderCells(cells, dirtyCoords);

	return (
		<div ref={myRef} className={classes.grid}>
			{cells}
			<WidgetModal
				selectedCell={selectedCell}
				open={widgetModalOpen}
				onClose={() => setWidgetModalOpen(false)}
				handleWidgetSelect={placeWidget}
			/>
		</div>
	);

	function placeWidget (col, row, type) {
		const { name, minSize } = Widgets[type];
		setComponents([...components, {
			size: {
				colStart: col,
				colEnd: col + minSize.col,
				rowStart: row,
				rowEnd: row + minSize.row
			},
			name,
			type
		}]);
	}

	function getCoords (c) {
		const { colStart, colEnd, rowStart, rowEnd } = c.size;
		const coordinates = [];
		for (let row = rowStart; row < rowEnd; row++) {
			for (let col = colStart; col < colEnd; col++) {
				coordinates.push({
					col,
					row
				});
			}
		}
		return coordinates;
	}

	function isDirty (col, row) {
		return dirtyCoords.some((coords) => coords.col === col && coords.row === row);
	}

	function renderComponents (cells) {
		const dirtyCoords = [];
		components.forEach((c) => {
			cells.push(<Widget metadata={c} key={`${c.size.colStart}|${c.size.rowStart}`}/>);
			dirtyCoords.push(...getCoords(c));
		});
		return dirtyCoords;
	}

	function renderCells (cells) {
		for (let row = 1; row <= rowsCount; row++) {
			for (let col = 1; col <= cellsCount; col++) {
				if (!isDirty(col, row)) {
					cells.push(<Cell
						col={col}
						row={row}
						key={`Col:${col} Row:${row}`}
						handleClick={handleCellClick}/>);
				}
			}
		}
	}
}

export { Dashboard, cellSize };
