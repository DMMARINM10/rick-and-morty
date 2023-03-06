import React, { FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface User {
    isLogged: boolean
}

interface Props {
    isLogged: string | null,
    user: User,
    // eslint-disable-next-line @typescript-eslint/ban-types
    setUser: (c: User) => void,
}

export const PrivateRoute: FC<Props> = ({
  isLogged,
  user,
  setUser
}) => {
    if(isLogged === 'true') {
        if(!user.isLogged) setUser({ isLogged: true })
        return <Outlet />
    } else if (user.isLogged) {
        localStorage.setItem('isLogged', 'true')
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}