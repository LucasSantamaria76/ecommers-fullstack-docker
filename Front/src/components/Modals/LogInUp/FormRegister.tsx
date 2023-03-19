import { Button, PasswordInput, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProfile } from '../../../types/user';
import { schemaRegister, IUserRegister } from './schemas';
import toast from 'react-hot-toast';
import { useModalStore } from '../../../store';

type TDataSelect = { value: string; label: string };

export const FormRegister = () => {
  const [provinces, setProvinces] = useState<[TDataSelect]>([{ value: '', label: '' }]);
  const [cities, setCities] = useState<[TDataSelect]>([{ value: '', label: '' }]);
  const { onClose } = useModalStore();
  const focusTrapRef = useFocusTrap();

  const { onSubmit, reset, getInputProps, setFieldValue } = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      profile: {
        firstName: '',
        lastName: '',
        city: '',
        province: '',
        adress: '',
        dni: '',
      },
    },
    validate: yupResolver(schemaRegister),
  });

  useEffect(() => {
    axios.get('https://apis.datos.gob.ar/georef/api/provincias').then(({ data: { provincias } }) => {
      const auxProv = provincias.map((province: any) => ({ value: province.nombre, label: province.nombre }));
      setProvinces(auxProv.sort((a: TDataSelect, b: TDataSelect) => a.value.localeCompare(b.value)));
    });
  }, []);

  const handleGetCities = async (value: string) => {
    setFieldValue('profile.province', value);
    const { data } = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${value}&max=1000`);
    const auxCities = data.municipios.map((city: any) => ({ value: city.nombre, label: city.nombre }));
    setCities(auxCities.sort((a: TDataSelect, b: TDataSelect) => a.value.localeCompare(b.value)));
  };

  const handleSubmit = async (values: IUserRegister & IProfile) => {
    try {
      const {
        data: { ok },
      } = await toast.promise(axios.post('users/register', values), {
        loading: 'Registrando...',
        success: <b>Usuario registrado correctamente</b>,
        error: <b>Ya existe un usuario con ese email</b>,
      });
      if (ok) {
        onClose('logInUp');
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit((values) => handleSubmit(values))} ref={focusTrapRef}>
      <Stack spacing='sm'>
        <TextInput withAsterisk label='Correo electronico' {...getInputProps('email')} data-autofocus />
        <TextInput label='Nombre' {...getInputProps('profile.firstName')} />
        <TextInput label='Apellido' {...getInputProps('profile.lastName')} />
        <Select
          label='Provincia'
          placeholder='Selecciona una Provincia'
          nothingFound='No se encontro opción'
          searchable
          {...getInputProps('profile.province')}
          data={provinces}
          onChange={handleGetCities}
        />
        <Select
          label='Ciudad'
          placeholder='Selecciona una Ciudad'
          nothingFound='No se encontro opción'
          searchable
          {...getInputProps('profile.city')}
          data={cities}
        />
        <TextInput label='Domicilio' {...getInputProps('profile.adress')} />
        <PasswordInput
          label='Contraseña'
          // description='La contraseña de contener al menos 6 caracteres de los cuales tienen que ser mínimo 1 letra minúscula, 1 mayúscula, 1 símbolo'
          {...getInputProps('password')}
          withAsterisk
        />
        <PasswordInput label='Repetir contraseña' withAsterisk {...getInputProps('confirmPassword')} />
        <Button type='submit'>Registrarse</Button>
      </Stack>
    </form>
  );
};
