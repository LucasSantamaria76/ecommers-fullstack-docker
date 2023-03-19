import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { IUser } from '../../../types/user';
import { schemaLogin } from './schemas';
import { useUserStore } from './../../../store/userStore';
import { shallow } from 'zustand/shallow';
import { useModalStore } from './../../../store/modalStore';
import { toast } from 'react-hot-toast';

export const FormLogin = () => {
  const focusTrapRef = useFocusTrap();
  const login = useUserStore((state) => state.login, shallow);
  const onClose = useModalStore((state) => state.onClose, shallow);

  const { onSubmit, onReset, getInputProps } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(schemaLogin),
  });

  const handleSubmit = (values: IUser) => {
    try {
      login(values);
      onClose('logInUp');
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={onSubmit(handleSubmit)} ref={focusTrapRef}>
      <Stack spacing='sm'>
        <TextInput withAsterisk label='Correo electronico' {...getInputProps('email')} data-autofocus />
        <PasswordInput label='Contraseña' {...getInputProps('password')} withAsterisk />
        <Button type='submit'>Iniciar sesión</Button>
      </Stack>
    </form>
  );
};
