import React from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton
} from '@chakra-ui/react';
import BucketPresenter from './BucketPresenter';
import AddNewBucketPresenter from './AddNewBucketPresenter';
import { connect } from 'react-redux';
import { editDatasource } from '../state/DatasourceAction';
import DatasourceStatus from '../model/DatasourceStatus';
import PcapApi from '../../pcap/service/PcapApi';

function BucketModal (props) {
	const { editDatasource, metaData } = props;
	const onAddBucketization = (bucketSize) => {
		editDatasource({
			datasource: {
				id: metaData.id,
				variants: [...metaData.variants, { bucketSize, status: DatasourceStatus.Status.LOADING }]
			}
		});
		PcapApi.bucketize(metaData.id, bucketSize).then((size) => {
			editDatasource({
				datasource: {
					id: metaData.id,
					variants: [...metaData.variants,
						{
							bucketSize,
							status: DatasourceStatus.Status.READY,
							packetsCount: size
						}
					]
				}
			});
		});
		props.onClose();
	};
	return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                <ModalHeader>Bucketization options</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <BucketPresenter metaData={props.metaData}/>
                    <AddNewBucketPresenter metaData={props.metaData} onSubmit={onAddBucketization}/>
                </ModalBody>
            </ModalContent>
        </Modal>
	);
}

export default connect(
	(state) => ({
		datasources: state.datasource.datasources
	}),
	{
		editDatasource
	}
)(BucketModal);
