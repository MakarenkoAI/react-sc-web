import { PseudoText } from 'ostis-ui-lib';

import styles from './Skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={styles.root}>
      <PseudoText width="100%" height={24} />
      <PseudoText width="60%" height={24} />
      <PseudoText width="80%" height={24} />
    </div>
  );
};
