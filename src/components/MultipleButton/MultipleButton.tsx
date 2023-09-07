import classNames from 'classnames';
import { Dropdown, DropdownOption, useBooleanState, useClickOutside } from 'ostis-ui-lib';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import ChevronDown from '@assets/images/chevronDown.svg';
import { Button } from '@components/Button';

import styles from './MultipleButton.module.scss';

interface IProps<T extends string> {
  value?: T;
  options: Array<{ value: T; title: ReactNode }>;
  onChange: (value: T) => void;
  containerRef?: RefObject<HTMLDivElement>;
  disabled?: boolean;
}

export const MultipleButton = <T extends string>({
  value,
  options,
  onChange,
  containerRef,
  disabled,
}: IProps<T>) => {
  const [isDropDownOpen, , onClose, toggleDropDown] = useBooleanState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside([ref, dropdownRef], onClose);

  useEffect(() => {
    const container = containerRef?.current;

    if (!container) return;

    const onScroll = () => {
      setScrollPosition(container.scrollTop);
    };

    container.addEventListener('scroll', onScroll);
    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (isDropDownOpen) onClose();
  }, [scrollPosition]);

  const title = options.find((option) => option.value === value)?.title;
  return (
    <>
      <div
        className={classNames(styles.multiplyButton, {
          [styles.multiplyButton_disabled]: disabled,
        })}
        ref={ref}
      >
        <Button
          appearance="secondaryAction"
          className={classNames(styles.button, {
            [styles.button_active]: isDropDownOpen,
            [styles.button_disabled]: disabled,
          })}
          onClick={(e) => {
            e.preventDefault();
            toggleDropDown();
          }}
        >
          {title}
          <ChevronDown
            className={classNames(styles.chevronDown, {
              [styles.chevronDown_revert]: isDropDownOpen,
              [styles.chevronDown_disabled]: disabled,
            })}
          />
        </Button>
        {isDropDownOpen && (
          <Dropdown targetRef={ref} ref={dropdownRef} className={styles.dropdown}>
            {options.map((option, ind) => (
              <DropdownOption
                key={ind}
                className={styles.option}
                onClick={() => {
                  onChange(option.value);
                  onClose();
                }}
              >
                {option.title}
              </DropdownOption>
            ))}
          </Dropdown>
        )}
      </div>
    </>
  );
};
