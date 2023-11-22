import { toast } from 'react-toastify';

export const CopyText = (text: string): void => {
  navigator.clipboard.writeText(text);
  toast.info('copied!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
