import useToastStore from '@/store/toastStore';
import styled from 'styled-components';
import Toast from './Toast';

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <ToastContainerStyle>
      {
        toasts.map((toast) => (
          <Toast key={toast.id} id={toast.id} message="{test.message}" type={toast.type} />
        ))
      }
    </ToastContainerStyle>
  );
};

const ToastContainerStyle = styled.div`
  position: fixed;
  top: 32px;
  right: 24px;
  z-index: 100;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default ToastContainer;