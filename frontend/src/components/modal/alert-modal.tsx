import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';

interface AlertModalProps {
  message: string;
  buttonLeftText: string;
  buttonRightText: string;
  icon: IconName;
  show: boolean;
  onClosed?: () => void;
  onLeftClicked?: () => void;
  onRightClicked?: () => void;
  hiddenLeftButton?: boolean;
  hiddenRightButton?: boolean;
}

export function AlertModal({
                             hiddenLeftButton = false,
                             hiddenRightButton = false,
                             buttonLeftText,
                             buttonRightText,
                             show,
                             icon,
                             message,
                             onClosed,
                             onLeftClicked,
                             onRightClicked,
                           }: AlertModalProps) {

  return (<Modal show={show} size="md" onClose={onClosed} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <DynamicIcon name={icon} className={'mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200'} />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            {!hiddenLeftButton && <Button color="red" onClick={onLeftClicked}>
              {buttonLeftText}
            </Button>}
            {!hiddenRightButton && <Button color="alternative" onClick={onRightClicked} autoFocus>
              {buttonRightText}
            </Button>}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
