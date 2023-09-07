import classNames from 'classnames';
import { useTranslate } from 'ostis-ui-lib';
import { Component, ErrorInfo, ReactNode } from 'react';
import ArrowIcon from '@assets/images/goBack.svg';
import { Button } from '@components/Button';
import { useBackNavigation } from '@hooks/useBackNavigation';

import styles from './ErrorBoundary.module.scss';

interface Props {
  children?: ReactNode;
  title: string;
  paragraph?: string;
  shouldReturn?: boolean;
  isToMain?: boolean;
  advice?: string;
  className?: string;
  isManagment?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

function GoBack() {
  const { goBack } = useBackNavigation();

  const translate = useTranslate();
  return (
    <Button appearance="secondaryAction" className={styles.backButton} onClick={goBack}>
      <ArrowIcon />
      {translate({ ru: 'Вернуться к предыдущему вопросу', en: 'Go back' })}
    </Button>
  );
}

function SetLanguage() {
  const translate = useTranslate();

  return (
    <p>{translate({ ru: 'Пожалуйста, перезагрузите страницу', en: ' Reload the page please' })}</p>
  );
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  basicRender() {
    return (
      <div
        className={classNames(styles.wrap, this.props.className, {
          [styles.managmentWrap]: this.props.isManagment,
        })}
      >
        <h4>{this.props.title}</h4>
        <p>{this.props.paragraph}</p>
        <p>{this.props.advice ? this.props.advice : <SetLanguage />}</p>
        {this.props.shouldReturn && <GoBack />}
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.basicRender();
    }

    return this.props.children;
  }
}
