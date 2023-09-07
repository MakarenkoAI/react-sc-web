import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './IconButton.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  squared?: boolean;
  disabled?: boolean;
  dimention?: 's' | 'm' | 'l';
}

export const IconButton = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      children,
      className,
      disabled = false,
      type = 'button',
      dimention = 'l',
      squared = 'false',
      ...restProps
    },
    ref,
  ) => {
    return (
      <button
        type={type}
        className={classNames(className, styles.iconButton, styles[`iconButton_${dimention}`], {
          [styles.iconButton_disabled]: disabled,
          [styles.iconButton_squared]: squared,
        })}
        ref={ref}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
