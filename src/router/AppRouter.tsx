import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useUserContext } from '../App';
import ViewPage from '../pages/ViewPage';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import LoginPage from '../pages/LoginPage';

const AppRouter = () => {
    const isLogged = localStorage.getItem('isLogged')
    const { user, setUser } = useUserContext()
    const props = {
        isLogged,
        user,
        setUser
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute {...props} />}>
                    <Route path='/login' element={<LoginPage />} />
                </Route>
                <Route element={<PrivateRoute {...props} />}>
                    <Route path='/characters' element={<ViewPage route='characters' />} />
                    <Route path='/locations' element={<ViewPage route='locations' />} />
                    <Route path='/episodes' element={<ViewPage route='episodes' />} />
                    <Route path='/favorites' element={<ViewPage route='favorites' />} />
                </Route>
                <Route path='/*' element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter