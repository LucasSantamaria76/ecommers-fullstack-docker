import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
  email: Yup.string().required('El correo es requerido').email('Correo inválido'),
  password: Yup.string().required('La contraseña es requerida'),
});

export interface IUserLogin extends Yup.InferType<typeof schemaLogin> {}

export const schemaRegister = Yup.object().shape({
  email: Yup.string().required('El correo es requerido').email('Correo inválido'),
  password: Yup.string().required('La contraseña es requerida'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

export interface IUserRegister extends Yup.InferType<typeof schemaRegister> {}
