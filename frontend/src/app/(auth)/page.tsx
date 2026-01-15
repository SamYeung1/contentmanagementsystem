'use client';
import { Alert, Button, Card } from 'flowbite-react';
import EmailIcon from '@/components/icons/email-icon';
import PasswordIcon from '@/components/icons/password-icon';
import TextField from '@/components/forms/fields/text-field';
import { actionLogin, LoginSubmitData } from '@/app/(auth)/form-action/auth';
import { useActionState } from 'react';
import { InfoIcon } from 'lucide-react';


export default function LoginPage() {
  const initialValues: LoginSubmitData = {
    initValue: {
      password: '',
      email: '',
    },
  };
  const [state, formAction, pending] = useActionState(actionLogin, initialValues);
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="min-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Admin Portal</h1>
        {state.serverError?.message && <Alert color="failure" icon={InfoIcon}>
          <span className="font-medium">{state.serverError?.message}</span>
        </Alert>}
        <form action={formAction} className="flex flex-col">
          <div className="pb-2">
            <TextField errorMessage={state.errors ? state.errors['email']?.join(', ') : null}
                       defaultValue={initialValues.initValue?.email} label={'Email'} name={'email'}
                       type={'email'}
                       icon={EmailIcon}
                       autoComplete="off" />
          </div>
          <div className="pb-6">
            <TextField errorMessage={state.errors ? state.errors['password']?.join(', ') : null}
                       defaultValue={initialValues.initValue?.password} label={'Password'} name={'password'}
                       type={'password'}
                       icon={PasswordIcon}
                       autoComplete="new-password" />
          </div>
          <Button
            className={'w-full'}
            type="submit"
            disabled={pending}>
            {pending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        {/*<div className="mt-4 rounded-md bg-gray-100 p-3 text-xs text-gray-600">*/}
        {/*</div>*/}
      </Card>
    </div>
  );
}