import { css, styled } from 'styled-components';

import { TAppearance } from './Button';

export const StyledButton = styled.button<{ appearance: TAppearance }>`
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  padding: 8px 16px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;

  outline: none;
  user-select: none;

  cursor: pointer;

  transition: all 0.2s ease 0s;

  ${({ appearance }) => {
    switch (appearance) {
      case 'primaryAction':
        return css`
          border-radius: 10px;
          border: 0;

          background: #5896c0;

          color: #ffffff;

          &:hover {
            color: #ffffff;
            background: #4980a5;
            text-decoration: none;
          }

          &:active {
            background: #4980a5;

            outline: 2px solid #5896c0;
            outline-offset: -2px;
          }

          &:disabled {
            background-color: #c0c0c0;
          }
        `;
      case 'primaryLarge':
        return css`
          border-radius: 10px;
          border: 0;

          background: #5896c0;

          padding: 8px 36px;

          font-size: 26px;
          line-height: 30px;
          color: #ffffff;

          &:hover {
            color: #ffffff;
            background: #4980a5;
            text-decoration: none;
          }

          &:active {
            background: #4980a5;

            outline: 2px solid #5896c0;
            outline-offset: -2px;
          }

          &:disabled {
            background-color: #c0c0c0;

            pointer-events: none;

            cursor: default;
          }
        `;
      case 'secondaryAction':
        return css`
          border: 2px solid transparent;
          border-radius: 10px;

          background: transparent;
          color: #5896c0;

          &:hover {
            border: 2px solid #f8f8f8;

            background-color: #f8f8f8;

            color: #5896c0;
            text-decoration: none;
          }

          &:active {
            border: 2px solid #ffffff;
            outline-offset: -2px;
          }

          &:disabled {
            background-color: #ffffff;
            color: #a6a6a6;

            pointer-events: none;

            cursor: default;
          }
        `;
    }
  }}
`;
