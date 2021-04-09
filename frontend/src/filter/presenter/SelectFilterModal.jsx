import React, { useState } from 'react';
import {
  FormControl,
  VStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

export default function SelectFilterModal({ isOpen, onClose, handleSubmit }) {
  const [filter, setFilter] = useState('this');
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(filter);
    onClose();
  };
  const handleChange = (event) => {
    setFilter(event);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Filter</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl id='filter' as='fieldset'>
              <RadioGroup value={filter} onChange={handleChange}>
                <VStack alignItems='start'>
                  <Radio value='this'>Exclude this</Radio>
                  <Radio value='others'>Exclude others</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>
            <Button type='submit'>Filter</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
