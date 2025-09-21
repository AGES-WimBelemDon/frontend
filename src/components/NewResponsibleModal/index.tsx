import { Box, Modal } from '@mui/material';

import { useNewResponsibleModal } from './hook';

export function NewResponsibleModal() {

  const {isOpen, closeModal} = useNewResponsibleModal();

  return (
    <Modal title={'Cadastrar Responsável'} open={isOpen} onClose={closeModal}>
      <Box></Box>
    </Modal>
  );
}