import React, { useState } from 'react';
import { Radio, RadioGroup, VStack } from '@chakra-ui/react';

export default function QueryTypeSelector({ onSubmit }) {
  const [radioValue, setRadioValue] = useState('octets');
  const handleOnChange = (queryType) => {
    setRadioValue(queryType);
    onSubmit(queryType);
  };
  return (
    <RadioGroup value={radioValue} onChange={handleOnChange}>
      <VStack alignItems='start'>
        <Radio value='octets'>Octets</Radio>
        <Radio value='packets'>Packets</Radio>
      </VStack>
    </RadioGroup>
  );
}
