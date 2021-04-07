import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	formFlex: {
		flexDirection: 'row'
	},
	inputControl: {
		padding: '10px',
		flex: '1'
	},
	control: {
		padding: '10px',
		flex: '0'
	}
});

export default function AddNewBucketPresenter (props) {
	const classes = useStyles();
	const [bucketSize, setBucketSize] = useState('1000');
	const onSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(parseInt(bucketSize));
	};
	const onBucketSizeChange = (event) => {
		setBucketSize(event.target.value);
	};
	return (<form onSubmit={onSubmit}>
        <Flex className={classes.formFlex}>
            <FormControl id='bucketSize' className={classes.inputControl}>
                <FormLabel>Bucket size</FormLabel>
                <Input placeholder='Enter bucket size...' value={bucketSize} onChange={onBucketSizeChange}/>
            </FormControl>
            <FormControl className={classes.control}>
                <FormLabel>Bucketize</FormLabel>
                <IconButton icon={<AddIcon/>} type='submit' variant='ghost'/>
            </FormControl>
        </Flex>
    </form>);
}
