import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import CheckMark from '@assets/images/checkMark.svg';
import styles from './checkbox.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, IProps>(
  ({ className, label, disabled, ...restProps }, ref) => {
    return (
      <label
        className={classNames(className, styles.wrapper, { [styles.wrapper_disabled]: disabled })}
      >
        <input
          className={classNames(styles.checkbox, styles.hidden)}
          disabled={disabled}
          type="checkbox"
          {...restProps}
          ref={ref}
        />
        <div
          className={classNames(styles.customCheckbox, {
            [styles.customCheckbox_disabled]: disabled,
          })}
        >
          <CheckMark
            className={classNames(styles.checkMark, {
              [styles.checkMark_disabled]: disabled,
            })}
          />
        </div>
        {label && (
          <div className={classNames(styles.label, { [styles.label_grey]: disabled })}>{label}</div>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
