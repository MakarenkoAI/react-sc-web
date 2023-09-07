import { Scg as UiKitScg, useToast } from 'ostis-ui-lib';
import { FC, useCallback } from 'react';
import { removeFromCache } from '@api/requests/scn';
import { Notification } from '@components/Notification';
import { scgUrl } from '@constants';
import { useScNavigation } from '@hooks/useScNavigation';

interface IProps {
  question?: number;
  className?: string;
  show?: boolean;
}

export const Scg: FC<IProps> = ({ question, className, show = false }) => {
  const { goToActiveFormatCommand } = useScNavigation();
  const { addToast } = useToast();

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
