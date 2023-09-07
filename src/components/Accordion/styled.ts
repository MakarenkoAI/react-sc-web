import { css, keyframes, styled } from 'styled-components';

const fadeOutToTop = keyframes`
to {
    transform: translateY(-30px);
    opacity: 0;
  }
`;

const fadeInToBottom = keyframes`
from {
    transform: translateY(-30px);
    opacity: 0;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-right: 28px;

  height: 36px;
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  margin: 2px 0px;

  cursor: pointer;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 23px;

  color: #bcc1be;
`;

export const Icon = styled.div`
  margin-right: 6px;
`;

export const ChevronDownWrapper = styled.div<{ expanded: boolean }>`
  display: flex;
  justify-content: center;

  margin-left: 12px;

  transform: rotate(0);
  transition: transform ease 0.3s;

  ${({ expanded }) =>
    expanded &&
    css`
      transform: rotate(180deg);
    `}
`;

export const ContentWrapper = styled.div<{ expanded: boolean }>`
  padding: 8px 16px 0px 24px;
  animation: ${fadeOutToTop} ease 0.3s both;

  ${({ expanded }) =>
    expanded &&
    css`
      animation: ${fadeInToBottom} ease 0.3s both;
    `}
`;
