'use client';

import { useAuth } from '@/context/auth-context';
import { Button, Card } from 'flowbite-react';
import EmailIcon from '@/components/icons/email-icon';
import PasswordIcon from '@/components/icons/password-icon';
import { Form, Formik } from 'formik';
import LoginValidationSchema from '@/components/form-validations/login-validation-schema';
import TextField from '@/components/forms/fields/text-field';
import { useRouter } from 'next/navigation';

interface LoginSubmitData {
  password: string;
  email: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login,user } = useAuth();
  const onSubmit = async (value: LoginSubmitData) => {
    await login(value.email);
    router.replace("/dashboard");
  };
  const initialValues: LoginSubmitData = {
    password: '',
    email: '',
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="min-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Admin Login</h1>
        <Formik initialValues={initialValues}
                validationSchema={LoginValidationSchema}
                onSubmit={onSubmit}>
          {({
              isSubmitting,
            }) => (<Form className="flex flex-col">
            <div className="pb-2">
              <TextField label={"Email"} name={"email"}
                         type={"email"}
                         icon={EmailIcon}
                         autoComplete="off"/>
            </div>
            <div className="pb-6">
              <TextField label={"Password"} name={"password"}
                         type={"password"}
                         icon={PasswordIcon}
                         autoComplete="new-password"/>
            </div>
            <Button
              className={'w-full'}
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>)}
        </Formik>
        {/*<div className="mt-4 rounded-md bg-gray-100 p-3 text-xs text-gray-600">*/}
        {/*  <p className="font-semibold">Demo Credentials:</p>*/}
        {/*  <p>Admin: (admin)@example.com</p>*/}
        {/*  <p>Editor: editor@example.com</p>*/}
        {/*</div>*/}
      </Card>
    </div>
  );
}