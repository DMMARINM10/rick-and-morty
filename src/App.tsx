import React, { createContext, useState, useContext } from 'react'
import AppRouter from './router/AppRouter';

interface State {
  isLogged: boolean
}

type Content = {
  user: State,
  setUser: (c: State) => void
}
export const UserContext = createContext<Content>({
  user: {
    isLogged: false
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});
export const useUserContext = () => useContext(UserContext)
const App = () => {
  const [user, setUser] = useState<State>({
    isLogged: false
  })
  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      <AppRouter />
    </UserContext.Provider >
  )
}

export default App
