import {
  ContextMenu,
  Scg as UiKitScg,
  useBooleanState,
  useLanguage,
  useScUtils,
  useToast,
} from 'ostis-ui-lib';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { removeFromCache } from '@api/requests/scn';
import { Notification } from '@components/Notification';
import { scgUrl } from '@constants';
import { useScNavigation } from '@hooks/useScNavigation';
import { Frame, StyledSpinner, Wrap } from './styled';

import { EWindowEvents, ITarget, IWindowEventData } from './types';

interface IProps {
  question?: number;
  className?: string;
  show?: boolean;
}

const SPINER_COLOR = '#5896C0';

const readonlyStyle = `
  <style>
    .demo-scg-tools-panel {
      display: none !important;
    }
  </style>
`;

export const Scg: FC<IProps> = ({ question, className, show = false }) => {
  const { goToActiveFormatCommand } = useScNavigation();
  const { addToast } = useToast();

  const onRenderScg = useCallback((iframe: any) => {
    console.log(iframe.renderScg);
  }, []);

  const onUpdateScg = useCallback(
    (question: any) => {
      if (question) removeFromCache(question);
    },
    [question],
  );

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

  // ****************************************************
  // ****************************************************
  // ****************************************************

  const [isReady, setIsready] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetNode, setTargetNode] = useState<ITarget | null>(null);
  const [isConfirmDeletePopupShown, showConfirmDeletePopup, hideConfirmDeletePopup] =
    useBooleanState(false);
  const [isConfirmClearScenePopupShown, showConfirmClearScenePopup, hideConfirmClearScenePopup] =
    useBooleanState(false);
  const [confirmDeleteElementsFunc, setConfirmDeleteElementsFunc] = useState<any>();
  const [confirmClearSceneFunc, setconfirmClearSceneFunc] = useState<any>();

  const ref = useRef<HTMLIFrameElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const lang = useLanguage();

  const onClose = () => setTargetNode(null);

  // const onContextMenu = (e: MouseEvent) => {
  const onContextMenu = (target: any) => {
    const elements = document.querySelectorAll(`[sc_addr="${Number(target)}"]`);

    if (!target) return;
    const addr = Number(target) || undefined;
    setTargetNode(null);
    setTimeout(() => {
      setTargetNode({
        element: elements[0] as HTMLElement,
        addr,
      });
    }, 10);
  };

  useEffect(() => {
    setIsLoading(true);
    const iframe = ref.current;
    if (!iframe) return setIsLoading(false);
    // if (!iframe.contentWindow) return;

    // const command = { type: 'onInitializationFinished' };

    // if (iframe.contentWindow) {
    //   console.log(123);
    //   iframe.contentWindow.postMessage({ type: 'onInitializationFinished' }, '*');
    // }
    // (iframe.contentWindow as any).onInitializationFinished = () => {
    //   setIsready(true);
    // };

    setTimeout(() => {
      iframe.contentWindow && iframe.contentWindow.postMessage({ type: 'demoImplementation' }, '*');

      // iframe.contentWindow?.addEventListener('DOMContentLoaded', () => {
      //   iframe.contentDocument?.addEventListener('click', onClose);
      //   iframe.contentDocument?.addEventListener('contextmenu', onContextMenu);
      //   setTimeout(() => setIsLoading(false), 800);
      // });
    }, 1000);

    // (iframe.contentWindow as any).demoImplementation = true;

    // iframe.contentWindow?.addEventListener('DOMContentLoaded', () => {
    //   iframe.contentDocument?.addEventListener('click', onClose);
    //   iframe.contentDocument?.addEventListener('contextmenu', onContextMenu);
    //   setTimeout(() => setIsLoading(false), 800);
    // });
  }, []);

  useEffect(() => {
    console.log(targetNode);
  }, [targetNode]);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    window.onmessage = function (event: MessageEvent<IWindowEventData>) {
      switch (event.data.type) {
        case EWindowEvents.onInitializationFinished:
          setIsready(true);
          setIsLoading(false);
          break;
        case EWindowEvents.readyForRender:
          iframe.contentWindow && iframe.contentWindow.postMessage({ type: 'renderScg' }, '*');
          break;
        case EWindowEvents.deleteScgElement:
          showConfirmDeletePopup();
          setConfirmDeleteElementsFunc(() => (iframe.contentWindow as any)?.deleteScgElement);
          break;
        case EWindowEvents.deleteScgElements:
          showConfirmDeletePopup();
          setConfirmDeleteElementsFunc(() => (iframe.contentWindow as any)?.deleteScgElements);
          break;
        case EWindowEvents.clearScene:
          showConfirmClearScenePopup();
          setconfirmClearSceneFunc(() => (iframe.contentWindow as any)?.clearScene);
          break;
        case EWindowEvents.updateScg:
          if (!question) break;
          onUpdateScg?.(question);
          break;
        case EWindowEvents.openFragment:
          if (!event.data?.payload?.fragmentAddr) break;
          onOpenFragment?.(event.data.payload.fragmentAddr);
          break;
        case EWindowEvents.emptyFragment:
          onEmptyFragment?.();
          break;
        case EWindowEvents.fullfilledFragment:
          onFullfilledFragment?.();
          break;

        case EWindowEvents.onContextMenu:
          onContextMenu(event.data.payload && event.data.payload);
          break;
      }
    };
  }, [onUpdateScg, onOpenFragment, onEmptyFragment, onFullfilledFragment, question]);

  // useEffect(() => {
  // (async () => {
  // if (!isReady || !show || !question) return;

  // const iframe = ref.current;
  // if (!iframe) return;

  // const { ...rest } = await findKeynodes(langToKeynode[lang]);
  // const activeLangKeynode = rest[snakeToCamelCase(langToKeynode[lang])];
  // (iframe.contentWindow as any).renderScg?.(question, activeLangKeynode.value);
  // })();
  // }, [isReady, question, show, lang, findKeynodes]);

  targetRef.current = targetNode?.element || null;

  return (
    <Wrap show={show} className={className}>
      {isLoading && <StyledSpinner appearance={SPINER_COLOR} />}
      <Frame src={scgUrl} ref={ref} title="SCg codes" />
      {targetNode && (
        <ContextMenu
          onClose={onClose}
          addr={targetNode.addr}
          relativeRef={ref}
          targetRef={targetRef}
        />
      )}
    </Wrap>
  );
};
