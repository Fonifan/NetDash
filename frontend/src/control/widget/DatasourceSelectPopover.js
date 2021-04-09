import React, { useState } from 'react';
import {
  Select,
  IconButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  Checkbox,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { SettingsIcon } from '@chakra-ui/icons';
import { hasValue } from '../../util/ObjectUtil';

const useStyles = createUseStyles({
  form: {
    paddingLeft: '10px',
  },
  control: {
    padding: '10px',
  },
});

function DatasourceSelectPopover(props) {
  const { datasources, selectedDatasource } = props;
  const classes = useStyles();
  const [datasourceName, setDatasource] = useState(selectedDatasource.datasourceName);
  const [bucketSize, setBucket] = useState(selectedDatasource.bucketSize);
  const [isBucketizationEnabled, setIsBucketEnabled] = useState(selectedDatasource.isBucketizationEnabled);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSetDatasource = (event) => {
    setDatasource(event.target.value);
  };
  const onSetBucket = (event) => {
    setBucket(event.target.value);
  };
  const onEnableBucket = (event) => {
    setIsBucketEnabled(!isBucketizationEnabled);
  };
  const onSelect = (event) => {
    event.preventDefault();
    props.onSubmit({ datasourceName, isBucketizationEnabled, bucketSize: parseInt(bucketSize) });
    onClose();
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement='bottom'
    >
      <PopoverTrigger>
        <IconButton icon={<SettingsIcon />} variant='ghost' />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Select datasource for this visualization</PopoverHeader>
        <PopoverBody>
          <form onSubmit={onSelect}>
            <FormControl id='datasource' className={classes.control}>
              <FormLabel>Select Datasource</FormLabel>
              <Select
                onChange={onSetDatasource}
                value={datasourceName}
                placeholder='Select datasource...'
              >
                {Object.keys(datasources).map((datasourceName) => <option key={datasourceName} value={datasourceName}>{datasourceName}</option>)}
              </Select>
            </FormControl>
            <FormControl id='bucketEnabled' className={classes.control}>
              <FormLabel>Enable bucketization</FormLabel>
              <Checkbox onChange={onEnableBucket} value={isBucketizationEnabled} isChecked={isBucketizationEnabled} />
            </FormControl>
            <FormControl id='bucket' className={classes.control}>
              <FormLabel>Select bucket size</FormLabel>
              <Select
                onChange={onSetBucket}
                value={bucketSize}
                isDisabled={!isBucketizationEnabled}
                placeholder='Select bucket size...'
              >
                {hasValue(datasourceName) ? datasources[datasourceName].variants.map((bucket) => (
                  <option
                    key={bucket.bucketSize}
                    value={bucket.bucketSize}
                  >{bucket.bucketSize}
                  </option>
                )) : null}
              </Select>
            </FormControl>
            <Button type='submit'>Apply</Button>
          </form>
        </PopoverBody>

      </PopoverContent>
    </Popover>
  );
}

export default DatasourceSelectPopover;
