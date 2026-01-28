import { Modal, ModalBody, Spinner } from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react/types';

interface LoadingModelProps{
  show:boolean;
}
const modalTheme: CustomFlowbiteTheme['modal'] = {
  content:{
    base:'w-auto'
  }
};
export function LoadingModel({show}:LoadingModelProps) {

  return (<Modal show={show} theme={modalTheme}>
      <ModalBody>
        <Spinner />
      </ModalBody>
    </Modal>
  );
}
