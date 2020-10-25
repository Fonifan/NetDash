import React from 'react';

function DatasourceItemPresenter (props) {
	const { name, url, type } = props;

	return (
		<div>
			<p>{name}</p>
			<p>{url}</p>
			<p>{type}</p>
		</div>);
}

export default DatasourceItemPresenter;
