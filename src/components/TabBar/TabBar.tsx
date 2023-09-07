import classNames from 'classnames';
import { FC } from 'react';

import styles from './TabBar.module.scss';

import { ITab } from './types';

export interface IProps {
  className?: string;
  activeTab: string;
  tabs: ITab<string>[];
  onChange: (value: string) => void;
}

export const TabBar: FC<IProps> = ({ className, activeTab, tabs, onChange }) => {
  return (
    <div className={classNames(styles.tabs, className)}>
      {tabs.map((tab) => (
        <div
          className={classNames(styles.tab, {
            [styles.tab_selected]: tab.value === activeTab,
            [styles.tab_notSelected]: tab.value !== activeTab,
          })}
          key={tab.value}
          onClick={() => onChange(tab.value)}
        >
          <div className={styles.tabWrapper}>
            <div
              className={classNames(styles.tabLabel, {
                [styles.tabLabel_selected]: tab.value === activeTab,
                [styles.tabLabel_notSelected]: tab.value !== activeTab,
              })}
            >
              {tab.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
