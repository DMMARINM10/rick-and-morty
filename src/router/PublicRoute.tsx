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

export const PublicRoute: FC<Props> = ({
  isLogged,
  user,
  setUser
}) => {
    if(isLogged === 'true') {
        if(!user.isLogged) setUser({ isLogged: true })
        return <Navigate to="/characters?page=1" />
    } else if (user.isLogged) {
        localStorage.setItem('isLogged', 'true')
        return <Navigate to="/characters?page=1" />
    } else {
        return <Outlet />
    }
}
