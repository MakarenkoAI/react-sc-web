import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { routes, DEFAULT_COMMAND_PATH } from '@constants';
import { Command } from '@pages/Command';
import { Main } from '@pages/Main';
import { Question } from '@pages/Question';

export const Router = () => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Routes>
        <Route
          path={routes.MAIN}
          element={
            <Layout>
              <Main />
            </Layout>
          }
        >
          <Route path={routes.COMMAND} element={<Command />} />
          <Route path={routes.QUESTION} element={<Question />} />
          <Route index element={<Navigate to={DEFAULT_COMMAND_PATH} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
