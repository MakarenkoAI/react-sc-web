import { lazy } from 'react';

export const Main = lazy(() => import(/* webpackChunkName: "main" */ './Main'));
