import { ReactNode } from 'react';

import styles from './PagesMenu.module.scss';

export interface IProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

export const PagesMenu = ({ icon, text, onClick }: IProps) => {
  return (
    <div className={styles.pagesMenu} onClick={onClick}>
      {icon}
      {text}
    </div>
  );
};
