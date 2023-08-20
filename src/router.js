import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';

function ProtectedRotes({ redirectTo }) {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function PagesRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route element={<ProtectedRotes redirectTo={"/"} />}>
                <Route path='/main' element={<Main />} />
            </Route>

        </Routes>
    )
}