import { FC, ReactNode } from 'react';
import { ScgPage } from '@components/ScgPage';
import { SidePanel } from '@components/SidePanel';
import { SidePanelWrapper } from '@components/SidePanelWrapper';

import styles from './Layout.module.scss';

export interface IProps {
  children?: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <header className={styles.header} />
      <SidePanelWrapper>
        <SidePanel className={styles.sideBar} />
      </SidePanelWrapper>
      <main className={styles.main}>
        <ScgPage />
        {children}
      </main>
    </div>
  );
};
