import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 300px;
    background: #ff9000;
    padding: 8px;
    border-radius: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;
  }

  &:hover span {
    opacity: 1;
  }
`;
