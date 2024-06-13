import { useTimeout } from '@/hooks/useTimeout';
import useToastStore, { ToastItem } from '@/store/toastStore';
import { useState } from 'react';
import { FaBan, FaInfoCircle, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

export const TOAST_REMOVE_DELAY = 3000;

function Toast({ id, message, type }: ToastItem) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadinOut, setIsFadinOut] = useState(false);
  
  const handlerRemoveToast = () => {
    setIsFadinOut(true);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     removeToast(id);
  //   }, TOAST_REMOVE_DELAY)

  //   return () => {
  //     clearTimeout(timer);
  //   }
  // }, []);

  useTimeout(() => {
    setIsFadinOut(true);
  }, TOAST_REMOVE_DELAY)

  const handleAnimationEnd = () => {
    if (isFadinOut) {
      removeToast(id);
    }
  };
  
  return (
    <ToastStyle className={isFadinOut ? 'fade-out' : 'fade-in'} onAnimationEnd={handleAnimationEnd}>
      <p>
        { type === 'info' && <FaInfoCircle /> }
        { type === 'error' && <FaBan /> }
        {message}
      </p>
      <button onClick={handlerRemoveToast}>
        <FaPlus />
      </button>
    </ToastStyle>
  );
};

const ToastStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  &.fade-out {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  background-color: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  opacity: 0;
  transition: all 0.3s ease-in-out;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    
    svg {
      trnasform: rotate(45deg);
    }
  }
`;

export default Toast;