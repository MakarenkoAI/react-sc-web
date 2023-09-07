import classNames from 'classnames';
import { Chip } from 'ostis-ui-lib';
import { isValidElement, MouseEvent, PropsWithChildren, ReactNode, useRef } from 'react';

import styles from './chips.module.scss';
import type { IChipProps, IConstantOption } from '../types';
import { preventDefault } from '../utils';

interface IMultipleChipsProps {
  options: IConstantOption[];
  shouldShowCount: boolean;
  disabled?: boolean;
  onChipRemove: (value: string) => void;
  onChipClick?: (evt: MouseEvent) => void;
}

interface ICounterChipsProps {
  count: number;
  onClick?: (evt: MouseEvent) => void;
  disabled?: boolean;
}

const CounterChip = ({ count, onClick, disabled }: PropsWithChildren<ICounterChipsProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  if (!count) return <div className={styles.shadowCounterChip} />;

  return (
    <div className={styles.counterChipWrap} onClick={onClick} ref={ref}>
      <Chip className={styles.counterChip} disabled={disabled}>
        +{count}
      </Chip>
    </div>
  );
};

interface IChipWrapperProps {
  option: IConstantOption;
  className?: string;
  disabled?: boolean;
  onChipRemove: (value: string) => void;
  onClick?: (evt: MouseEvent) => void;
}

const ChipWrapper = ({
  className,
  option,
  disabled: disabledFromProps,
  onClick,
  onChipRemove,
}: IChipWrapperProps) => {
  const disabledFromMeta = getChipMeta(option, onChipRemove).disabled;
  const disabled = disabledFromMeta || disabledFromProps;
  return (
    <Chip
      className={classNames(className, styles.chip)}
      onClick={onClick}
      onClose={getChipMeta(option, onChipRemove).onClose}
      disabled={disabled}
    >
      {getChipMeta(option, onChipRemove).children}
    </Chip>
  );
};

const chipIsChipMeta = (chip: IChipProps | ReactNode): chip is IChipProps =>
  typeof chip === 'object' && chip !== null && !isValidElement(chip);

const getChipMeta = (
  { value, disabled, renderChip }: IConstantOption,
  onChipRemove: (value: string) => void,
) => {
  const chip = renderChip();
  return chipIsChipMeta(chip)
    ? { ...chip, onClose: () => chip.onClose?.({ value, disabled }) }
    : { disabled, onClose: () => onChipRemove(value), children: chip };
};

export const Chips = ({
  options,
  shouldShowCount,
  disabled,
  onChipClick,
  onChipRemove,
}: IMultipleChipsProps) => (
  <>
    {options.map((option, optionInd) => (
      <div className={styles.chipBox} key={option.value} onMouseDown={preventDefault}>
        <ChipWrapper
          className="chip"
          option={option}
          onClick={onChipClick}
          onChipRemove={onChipRemove}
          disabled={disabled}
        />
        {shouldShowCount && (
          <CounterChip
            onClick={onChipClick}
            count={options.length - optionInd - 1}
            disabled={disabled}
          >
            {options.slice(optionInd + 1).map((innerOption) => (
              <ChipWrapper
                key={innerOption.value}
                option={innerOption}
                onClick={onChipClick}
                onChipRemove={onChipRemove}
                disabled={disabled}
              />
            ))}
          </CounterChip>
        )}
        {!shouldShowCount && <div className={styles.shadowCounterChip} />}
      </div>
    ))}
  </>
);
