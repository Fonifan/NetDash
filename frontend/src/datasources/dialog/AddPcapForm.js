import React, { useState } from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Select
} from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	control: {
		padding: '10px'
	}
});

function AddPcapForm (props) {
	const [file, setSelectedFile] = useState();
	const [type, setType] = useState();
	const classes = useStyles();

	const onFileChange = event => {
		setSelectedFile(event.target.files[0]);
	};
	const selectedType = (event) => {
		setType(event.target.value);
	};
	const onSubmitClick = (event) => {
		event.preventDefault();
		const datasource = {
			file,
			type
		};
		props.onSubmit(datasource);
	};

	return (
		<form onSubmit={onSubmitClick}>
			<FormControl id='type' className={classes.control}>
				<FormLabel>PCAP type</FormLabel>
				<Select placeholder='Select PCAP type' value={type} onChange={selectedType}>
					<option value='conversation'>Conversation</option>
					<option value='domain'>Domain</option>
					<option value='encrypted'>Encrypted</option>
					<option value='file'>File</option>
				</Select>
			</FormControl>
			<FormControl id='file' className={classes.control}>
				<FormLabel>
					File
				</FormLabel>
				<Input type='file' onChange={onFileChange}/>
			</FormControl>
			<Button
				className={classes.control}
				type='submit'
			>
				Submit
			</Button>
		</form>
	);
}

export default AddPcapForm;
