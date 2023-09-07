import classNames from 'classnames';
import { HTMLAttributes, useEffect, useMemo } from 'react';

import styles from './highlight.module.scss';
import { useDropDownSearchSelectContext, useOptionContext } from '../useSearchSelectContext';
import { getTextHighlightMeta } from '../utils';

interface TextHighlightPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: string;
}

export const Highlight = ({ children = '', ...props }: TextHighlightPanelProps) => {
  const selectContext = useDropDownSearchSelectContext();
  const { onAddTextToHighlight } = useOptionContext();

  const searchValue = selectContext?.searchValue || '';

  const { chunks, parts } = useMemo(
    () => getTextHighlightMeta(children, searchValue, selectContext?.highlightFormat),
    [children, searchValue, selectContext?.highlightFormat],
  );

  useEffect(() => {
    onAddTextToHighlight(children);
  }, [onAddTextToHighlight, children]);

  return (
    <div {...props} className={classNames(props.className, styles.panel)} title={children}>
      {parts.map((part, i) =>
        chunks.includes(part.toLowerCase()) ? (
          <span className={styles.higlightedText} key={i}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </div>
  );
};
