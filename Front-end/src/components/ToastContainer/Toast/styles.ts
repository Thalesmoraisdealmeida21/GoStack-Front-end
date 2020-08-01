import React from 'react';

import styled, {css} from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
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






export const Container = styled(animated.div)<ContainerProps>`
  position: relative;
  width: 360px;
  background: #fddede;
  color: #c53030;
  display: flex;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  width: 250px;
  border-radius: 10px;
  overflow: hidden;

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
