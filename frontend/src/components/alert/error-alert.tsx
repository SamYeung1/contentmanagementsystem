import { InfoIcon } from 'lucide-react';
import { Alert } from 'flowbite-react';
import { AlertProps } from '@/components/alert/interface';

export function ErrorAlert({ message }:AlertProps) {
  return <Alert color="failure" icon={InfoIcon}>
    <span className="font-medium">{message}</span>
  </Alert>
}