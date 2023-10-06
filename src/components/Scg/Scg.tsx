import { Scg as UiKitScg, useLanguage, useToast } from 'ostis-ui-lib';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { removeFromCache } from '@api/requests/scn';
import { Notification } from '@components/Notification';
import { API_URL, routes, scgUrl } from '@constants';
import { useScNavigation } from '@hooks/useScNavigation';

interface IProps {
  question?: number;
  className?: string;
  show?: boolean;
}

export const Scg: FC<IProps> = ({ question, className, show = false }) => {
  const { goToActiveFormatCommand } = useScNavigation();
  const { addToast } = useToast();

  const [isReady, setIsready] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

  const onUpdateScg = useCallback(() => {
    if (question) removeFromCache(question);
  }, [question]);

  const onOpenFragment = useCallback(
    (fragmentAddr: number) => {
      goToActiveFormatCommand(fragmentAddr, 'ui_menu_view_get_user_fragment');
    },
    [goToActiveFormatCommand],
  );

  const onEmptyFragment = useCallback(() => {
    addToast(
      <Notification
        type="warning"
        title={{
          ru: 'Вы не можете сохранить пустой фрагмент',
          en: `It's impossible to save an empty fragment`,
        }}
      />,
      {
        position: 'bottomRight',
        duration: 2000,
      },
    );
  }, [addToast]);

  const onFullfilledFragment = useCallback(() => {
    addToast(
      <Notification
        type="success"
        title={{
          ru: 'Сохранено',
          en: `Saved`,
        }}
      />,
      {
        position: 'bottomRight',
        duration: 2000,
      },
    );
  }, [addToast]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const iframe = ref.current;
  //   if (!iframe) return setIsLoading(false);
  //   (iframe.contentWindow as any).onInitializationFinished = () => {
  //     setIsready(true);
  //   };

  //   // iframe.contentWindow?.addEventListener('DOMContentLoaded', () => {
  //   //   iframe.contentDocument?.addEventListener('click', onClose);
  //   //   iframe.contentDocument?.addEventListener('contextmenu', onContextMenu);
  //   //   setTimeout(() => setIsLoading(false), 800);
  //   // });
  // }, []);

  // useEffect(() => {
  //   if (!isReady || !show || !question) return;
  //   const iframe = ref.current;
  //   if (!iframe) return;
  //   (iframe.contentWindow as any).renderScg?.(question);
  // }, [isReady, question, show]);

  return (
    <UiKitScg
      question={question}
      className={className}
      show={show}
      url={scgUrl}
      onUpdateScg={onUpdateScg}
      onOpenFragment={onOpenFragment}
      onEmptyFragment={onEmptyFragment}
      onFullfilledFragment={onFullfilledFragment}
    />
  );
};
