import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  password: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
});

export default loginValidationSchema;