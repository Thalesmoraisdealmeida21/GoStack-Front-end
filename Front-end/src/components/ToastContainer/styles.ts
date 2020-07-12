import styled, { css } from 'styled-components';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasDescription?: boolean;
}

const toastTypeVariation = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 30px;
`;

export const Toast = styled.div<ToastProps>`
  position: relative;
  width: 360px;
  background: #ebf8ff;
  color: #3172b7;
  display: flex;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  width: 250px;
  border-radius: 10px;

  & + div {
    margin-top: 10px;
  }

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    strong {
      margin-left: 10px;
      font-weight: 600;
    }

    p {
      margin-top: 4px;
      opacity: 0.9;
      font-size: 14px;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 15px;
    opacity: 0.8;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props => toastTypeVariation[props.type || 'info']}
`;
