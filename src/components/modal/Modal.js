import React from 'react';
import { Modal } from 'reactstrap';
import { useSelector } from 'react-redux'
import { ModalConfig } from './ModalConfig';

const ModalExtended = () => {
  const dialogShown = useSelector(state => state.dialog.open); 
  const dialog = useSelector(state => state.dialog.type); 
  const Component = ModalConfig[dialog];
  const isOpen = dialog && dialogShown;

  return (
    <Modal isOpen={!!isOpen}>
      {dialog && <Component/>}
    </Modal>
  );
}

export default ModalExtended;