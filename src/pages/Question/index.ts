import { lazy } from 'react';

export const Question = lazy(() => import(/* webpackChunkName: "question" */ './Question'));
