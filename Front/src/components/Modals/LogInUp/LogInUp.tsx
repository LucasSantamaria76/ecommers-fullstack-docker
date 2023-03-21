import { useState } from 'react';
import { Group, Modal, Text } from '@mantine/core';
import { useModalStore } from '../../../store';
import { FormRegister } from './FormRegister';
import { FormLogin } from './FormLogin';
import { useStyles } from './styles';

interface Props {}

const LogInUp = (props: Props) => {
  const [isRegister, setIsRegister] = useState(false);
  const { logInUp, onClose } = useModalStore(({ logInUp, onClose }) => ({ logInUp, onClose }));
  const { classes } = useStyles();

  return (
    <Modal.Root opened={logInUp} onClose={() => onClose('logInUp')} centered size='lg'>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{isRegister ? 'Formulario de registro' : 'Iniciar sesión'}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          {isRegister ? <FormRegister /> : <FormLogin />}
          <Group mt={20} spacing='xs'>
            <Text>{isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Registrate'}</Text>
            <Text component='a' onClick={() => setIsRegister(!isRegister)} className={classes.link}>
              Aquí
            </Text>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
export default LogInUp;
