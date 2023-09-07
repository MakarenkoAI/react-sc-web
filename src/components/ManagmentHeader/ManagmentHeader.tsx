import { ChangeEventHandler, FC } from 'react';
import BackArrow from '@assets/images/backArrow.svg';
import { useScNavigation } from '@hooks/useScNavigation';

import styles from './ManagmentHeader.module.scss';

import { SearchBar } from './SearchBar';

interface IProps {
  title: string;
  inputPlaceholder?: string;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
}

export const ManagmentHeader: FC<IProps> = ({ title, inputPlaceholder, onInputChange }) => {
  const { goToPrevHistoryItem } = useScNavigation();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.backArrow} onClick={goToPrevHistoryItem}>
          <BackArrow />
        </div>
        <div className={styles.headerContent}>
          {title}
          {inputPlaceholder && onInputChange && (
            <SearchBar inputPlaceholder={inputPlaceholder} onInputChange={onInputChange} />
          )}
        </div>
      </div>
    </>
  );
};
