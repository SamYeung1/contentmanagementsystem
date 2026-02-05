import React, { createContext, useCallback, useContext, useState } from 'react';
import { AlertModal } from '@/components/modal/alert-modal';
import { useTranslations } from 'use-intl';
import { IconName } from 'lucide-react/dynamic';

type AlertType = 'WARNING' | 'ERROR' | 'CONFIRM';

interface AlertOption {
  message: string;
  type: AlertType,
  onLeftClicked?: () => void
  onRightClicked?: () => void,
  hiddenLeftButton?: boolean;
  hiddenRightButton?: boolean;
  buttonLeftText?: string,
  buttonRightText?: string,
}

interface AlertContextProps {
  showError: (message?:string,onCloseClicked?: () => void) => void;
  showConfirm: (message:string,onLeftClicked?: () => void, onRightClicked?: () => void) => void;
}

const AlertContext = createContext<AlertContextProps | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const icon = {
    'WARNING': 'circle-alert',
    'ERROR': 'circle-alert',
    'CONFIRM': 'circle-alert',
  };
  const [config, setConfig] = useState<AlertOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const showError = useCallback((message?:string,onCloseClicked?: () => void) => {
    setConfig({
      type: 'ERROR',
      message: message ? message : t('Common.modal.error_message'),
      onLeftClicked: onCloseClicked,
      hiddenRightButton: true,
      buttonLeftText: t('Common.button.ok'),

    });
    setIsOpen(true);
  }, [t]);
  const showConfirm = useCallback((message:string,onLeftClicked?: () => void, onRightClicked?: () => void) => {
    setConfig({
      type: 'CONFIRM',
      message: message,
      onLeftClicked: onLeftClicked,
      onRightClicked: onRightClicked,
    });
    setIsOpen(true);
  }, [t]);
  const contextValue = React.useMemo(() => ({
    showError, showConfirm,
  }), [showError, showConfirm]);
  return <AlertContext.Provider value={contextValue}>
    <AlertModal message={config?.message || ''}
                buttonLeftText={config?.buttonLeftText ? config?.buttonLeftText : t('Common.button.confirm_sure')}
                buttonRightText={config?.buttonRightText ? config?.buttonRightText : t('Common.button.cancel_sure')}
                icon={icon[config?.type || 'WARNING'] as IconName} show={isOpen}
                onLeftClicked={() => {
                  config?.onLeftClicked?.();
                  setIsOpen(false);
                }}
                onRightClicked={() => {
                  config?.onRightClicked?.();
                  setIsOpen(false);
                }}
                hiddenRightButton={config?.hiddenRightButton}
                hiddenLeftButton={config?.hiddenLeftButton}
    />
    {children}
  </AlertContext.Provider>;
}

export function useAlert() {
  return useContext(AlertContext);
}

