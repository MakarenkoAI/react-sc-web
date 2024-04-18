import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';
import { CardComponentType } from '@components/Card/types';

import Interface from '@assets/images/DefaultPluginImages/Interface.svg';
import KnowledgeBase from '@assets/images/DefaultPluginImages/KnowledgeBase.svg';
import ProblemSolver from '@assets/images/DefaultPluginImages/ProblemSolver.svg';
import Subsystem from '@assets/images/DefaultPluginImages/Subsystem.svg';

export const getCardLogo = (type: CardComponentType): React.ReactNode => {
  switch (type) {
    case CardComponentType.interface:
      return <Interface />;
    case CardComponentType.knowledgeBase:
      return <KnowledgeBase />;
    case CardComponentType.problemSolver:
      return <ProblemSolver />;
    case CardComponentType.subSystem:
      return <Subsystem />;
    default:
      return null;
  }
};

export const getSubtitleClassName = (type: CardComponentType): string => {
  switch (type) {
    case CardComponentType.interface:
      return classNames(styles.subtitle, styles.subtitleInterface);
    case CardComponentType.knowledgeBase:
      return classNames(styles.subtitle, styles.subtitleKnowledgeBase);
    case CardComponentType.problemSolver:
      return classNames(styles.subtitle, styles.subtitleProblemSolver);
    case CardComponentType.subSystem:
      return classNames(styles.subtitle, styles.subtitleSubSystem);
    default:
      return classNames(styles.subtitle, styles.defaultSubtitle);
  }
};

export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) {
    return str.replace(/_/g, ' ');
  }

  const truncatedString = str.slice(0, length);
  const lastSpaceIndex = truncatedString.lastIndexOf('_');
  let finalString = truncatedString.substring(0, lastSpaceIndex).replace(/_/g, ' ');
  finalString += '...';

  return finalString;
};
