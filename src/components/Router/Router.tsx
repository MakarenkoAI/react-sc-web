import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { DEFAULT_COMMAND_PATH, routes } from '@constants';
import { Main } from '@pages/Main';
import { Command } from '@pages/Command';
import { Question } from '@pages/Question';

export const Router = () => {
  return (
    <BrowserRouter>
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
            {/* <Route index element={<Navigate to={DEFAULT_COMMAND_PATH} replace />} /> */}
            <Route path={routes.COMMAND} element={<Command />} />
            <Route path={routes.QUESTION} element={<Question />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
