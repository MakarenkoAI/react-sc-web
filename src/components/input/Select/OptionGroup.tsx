import { FC, ReactNode } from 'react';

import { OptionGroupProvider } from './useSearchSelectContext';

interface IProps {
  disabled?: boolean;
  label: string;
  children?: ReactNode;
}

export const OptionGroup: FC<IProps> = ({ label, disabled = false, children }) => {
  return (
    <OptionGroupProvider label={label} disabled={disabled}>
      <div>{label}</div>
      {children}
    </OptionGroupProvider>
  );
};
