import { FC, ReactNode } from 'react';

import styles from './Field.module.scss';

export interface IFieldProps {
  label?: string;
  inputName?: string;
  extraText?: string;
  className?: string;
  fieldClassName?: string;
  children?: ReactNode;
}

export const Field: FC<IFieldProps> = ({ children, label, inputName, extraText, className }) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputName} className={styles.labelName}>
          {label}
        </label>
      )}
      {children}
      {extraText && <div className={styles.errorText}>{extraText}</div>}
    </div>
  );
};
