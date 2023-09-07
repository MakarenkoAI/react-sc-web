import cn from 'classnames';
import { InputStatus, refSetter } from 'ostis-ui-lib';
import {
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import AuthPassword from './assets/authorization-password.svg';
import AuthPasswordCrossed from './assets/eyeCrossed.svg';
import styles from './Input.module.scss';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  status?: InputStatus;
  inputClassName?: string;
  isSearch?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      iconLeft,
      iconRight,
      type,
      status,
      className,
      inputClassName,
      isSearch = false,
      disabled,
      style,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const innerRef = useRef<HTMLInputElement>(null);
    const onMakePasswordVisible = () => {
      inputType === 'password' ? setInputType('text') : setInputType('password');
      setIsShowPassword((prev) => !prev);
    };

    const onWrapperClick = () => {
      innerRef?.current?.focus();
    };

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      restProps.onFocus?.(e);
    };
    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      restProps.onBlur?.(e);
    };
    const onInputMouseDown = (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      restProps.onMouseDown?.(e);
    };

    useEffect(() => {
      innerRef.current?.setSelectionRange(
        innerRef.current?.value.length,
        innerRef.current?.value.length,
      );
    }, [inputType]);

    const isPassword = type === 'password';
    return (
      <div
        className={cn(styles.wrapper, className, inputClassName, {
          [styles.search]: isSearch,
          [styles.search_focused]: isFocused && isSearch,
          [styles.wrapper_focused]: isFocused,
          [styles.wrapper_error]: status === 'error',
          [styles.wrapper_disabled]: disabled,
        })}
        style={style}
        onClick={onWrapperClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        {iconLeft && <div className={styles.leftIcon}>{iconLeft}</div>}
        <input
          className={cn(styles.input, {
            [styles.input_disabled]: disabled,
          })}
          ref={refSetter<HTMLInputElement>(ref, innerRef)}
          autoComplete="off"
          spellCheck="false"
          type={inputType}
          disabled={disabled}
          {...restProps}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseDown={onInputMouseDown}
        />
        {(iconRight || isPassword) && (
          <div className={styles.rightIcon}>
            {isPassword && isShowPassword && (
              <AuthPasswordCrossed
                className={styles.showPasswordSvg}
                onClick={onMakePasswordVisible}
              />
            )}
            {isPassword && !isShowPassword && (
              <AuthPassword className={styles.hidePasswordSvg} onClick={onMakePasswordVisible} />
            )}
            {iconRight}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
