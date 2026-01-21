import React, { createContext, useContext } from 'react';
import { CurrentUserResponse } from '@/lib/cms-api/auth';

interface CurrentUserContextProviderProps {
  user: CurrentUserResponse;
  children: React.ReactNode;
}

interface CurrentUserContextProps {
  user: CurrentUserResponse | null;
}

const CurrentUserContext = createContext<CurrentUserContextProps>({user:null});
export function useCurrentUser() {
  return useContext(CurrentUserContext);
}


export default function CurrentUserProvider({
                                                    children,
                                                    user,
                                                  }: CurrentUserContextProviderProps): React.ReactNode {
  return <CurrentUserContext.Provider value={{ user }}>
    {children}
  </CurrentUserContext.Provider>;
}