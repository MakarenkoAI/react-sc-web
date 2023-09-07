import { ButtonHTMLAttributes, ReactNode } from 'react';

import { StyledButton } from './styled';

export type TAppearance = 'primaryLarge' | 'primaryAction' | 'secondaryAction';
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: TAppearance;
  children: ReactNode;
  squared?: boolean;
}

export const Button = ({
  children,
  appearance = 'primaryAction',
  className,
  ...restProps
}: IButton) => {
  return (
    <StyledButton appearance={appearance} {...restProps} className={className}>
      {children}
    </StyledButton>
  );
};
