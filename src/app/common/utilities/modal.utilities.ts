import { ModalOptions } from 'flowbite';

export const options: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {},
  onShow: () => {},
  onToggle: () => {},
};

export const instanceOptions = {
  id: 'modalTarget',
  override: true,
};
