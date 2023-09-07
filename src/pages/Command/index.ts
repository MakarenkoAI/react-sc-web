import { lazy } from 'react';

export const Command = lazy(() => import(/* webpackChunkName: "command" */ './Command'));
