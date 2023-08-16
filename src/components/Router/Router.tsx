import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../pages/Login'

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<>loading...</>}>
        <Routes>
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" />
          </Route>
          <Route path="admin">
            <Route index />
            <Route path="users" />
          </Route>
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
