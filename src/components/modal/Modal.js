import React from 'react';
import { Modal} from 'reactstrap';
import { useSelector } from 'react-redux'
import { ModalConfig } from './ModalConfig';

const ModalExtended = () => {
  const dialogShown = useSelector(state => state.open); 
  const dialog = useSelector(state => state.type); 
  const Component = ModalConfig[dialog];

  return (
    <Modal isOpen={dialogShown}>
      {dialog && <Component/>}
    </Modal>
  );
}

export default ModalExtended;