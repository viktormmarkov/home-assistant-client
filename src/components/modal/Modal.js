import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ModalExtended extends React.Component {
    toggle = () => {
        this.setState({modal: this.state.modal});
    }

    render() {
        const {modal} = this.props;
        return (
            <Modal isOpen={modal}>
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody>
              dynamic import goes here.
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Do Something</Button>{' '}
              <Button color="secondary">Cancel</Button>
            </ModalFooter>
          </Modal>
        );
    }
}