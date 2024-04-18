import React from 'react';
import styles from './Card.module.scss';
import { CardComponentType } from './types';
import { ScAddr } from 'ts-sc-client';
import { getCardLogo, getSubtitleClassName, truncateString } from './utils';
import { initiateComponentInstallAgent } from '../../api/sc/install/install';
import GithubIcon from '@assets/images/GithubIcon.svg';
import { useTranslate } from 'ostis-ui-lib';

export interface ComponentCardProps {
  name: string;
  type: CardComponentType;
  description: string;
  github: string;
  component: ScAddr;
  setShowComponent: React.Dispatch<React.SetStateAction<ScAddr | undefined>>;
}

export const Card: React.FC<ComponentCardProps> = ({
  name,
  type,
  description,
  github,
  component,
  setShowComponent,
}) => {
  const translate = useTranslate();
  const logoComponent = getCardLogo(type);
  const subtitleClassName = getSubtitleClassName(type);
  name = truncateString(name, 25);

  const handleContainerClick = () => {
    setShowComponent(component);
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.info}>
        <div className={styles.logo}>{logoComponent}</div>

        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <div className={styles.title}>{name}</div>
            <div className={subtitleClassName}>{type}</div>
          </div>

          <div className={styles.description}>{truncateString(description, 100)}</div>
        </div>
      </div>

      <div className={styles.infoUrl}>
        <a
          href={github}
          className={styles.icon}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          <GithubIcon />
        </a>
        <button
          className={styles.installLink}
          onClick={(event) => {
            initiateComponentInstallAgent(component);
            event.stopPropagation();
          }}
        >
          {translate({ ru: 'Установить', en: 'Install' })}
        </button>
      </div>
    </div>
  );
};
