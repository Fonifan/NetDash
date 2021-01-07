import React, { useState } from 'react';

function AddPcapForm (props) {
	const [, setSelectedFile] = useState();

	const onFileChange = event => {
		const selectedFile = event.target.files[0];
		setSelectedFile({ selectedFile });
		props.onUpdateDatasource('file', selectedFile);
	};

	return (
		<form>
			<input type='file' onChange={onFileChange}/>
		</form>
	);
}

export default AddPcapForm;
