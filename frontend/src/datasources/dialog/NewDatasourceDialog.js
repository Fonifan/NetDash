import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import AddPcapForm from './AddPcapForm';

const useStyles = createUseStyles({
	form: {
		padding: 20
	}
});

function NewDatasourceDialog (props) {
	const classes = useStyles();

	return (
		<Modal
			isOpen={props.open}
			onClose={props.onClose}
		>
			<ModalContent>
				<ModalHeader>Add new datasource</ModalHeader>
				<ModalCloseButton/>
				<ModalBody className={classes.form}>
					<AddPcapForm onSubmit={props.onSubmit}/>
				</ModalBody>
			</ModalContent>
		</Modal>);
}

export default NewDatasourceDialog;
