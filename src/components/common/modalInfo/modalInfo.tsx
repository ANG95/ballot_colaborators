import { FC } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface ModalInfoProps {
  isOpen: boolean;
  title?: string;
  description: string;
  type?: 'warning' | 'error' | 'info';
  confirm: {
    buttonText: string;
    onPress: () => void;
  };
  cancel: {
    buttonText: string;
    onPress: () => void;
  };
}

const ModalInfo: FC<ModalInfoProps> = ({ isOpen, title, description, type = 'warning', confirm, cancel }) => {

  return (
    <Modal isOpen={isOpen} toggle={cancel?.onPress} centered>
      {title && <ModalHeader style={{
        borderTop: `20px solid ${type === 'warning' ? 'yellow' : type === 'error' ? 'red' : '#007bff'}`
      }} toggle={cancel?.onPress}>{title}</ModalHeader>}
      <ModalBody>{description}</ModalBody>
      <ModalFooter>
        {confirm?.buttonText && (
          <Button color="success" onClick={confirm?.onPress}>
            {confirm?.buttonText}{' '}
          </Button>
        )}
        {cancel?.buttonText && (
          <Button color="danger" onClick={cancel?.onPress}>
            {cancel?.buttonText}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ModalInfo;
