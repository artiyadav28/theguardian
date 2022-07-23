import { toast } from 'react-toastify';

const defaultConfig = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 5000,
  pauseOnHover: true,
};

const warningConfig = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: false,
  closeOnClick: true,
};

const infoBottomConfig = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 3000,
  pauseOnHover: true,
};

const showToast = (type, message) => {
  switch (type) {
    case 'ERROR':
      return toast.error(message, defaultConfig);
    case 'SUCCESS':
      return toast.success(message, defaultConfig);
    case 'WARNING':
      return toast.warn(message, warningConfig);
    case 'INFO':
      return toast.info(message, defaultConfig);
    case 'INFO_BOTTOM':
      return toast.info(message, infoBottomConfig);
    default:
      return;
  }
};

export default showToast;
