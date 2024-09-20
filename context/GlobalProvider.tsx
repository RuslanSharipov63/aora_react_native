import { getCurrentUser } from '../lib/appwrite';
import React, { createContext, useContext, useEffect, useState } from "react";


type UserProps =
  {
    "$id": string,
    "$createdAt": string,
    "$updatedAt": string,
    "name": string,
    "registration": string,
    "status": boolean,
    "labels": any,
    "passwordUpdate": string,
    "email": string,
    "phone": string,
    "emailVerification": boolean,
    "phoneVerification": boolean,
    "mfa": boolean,
    "prefs": any,
    "targets": [
      {
        "$id": string,
        "$createdAt": string,
        "$updatedAt": string,
        "name": string,
        "userId": string,
        "providerId": any,
        "providerType": string,
        "identifier": string
      }
    ],
    "accessedAt": string
  }

export type GlobalContextProps = {
  user: UserProps | null,
  isLogged: boolean,
  setIsLogged: (param: boolean) => void,
  setUser: (param: boolean) => void,
  loading: boolean,

}
type GlobalProviderProps = {
  children: JSX.Element | JSX.Element[];
}


const GlobalContext = createContext<GlobalContextProps | null>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: GlobalProviderProps) => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <GlobalContext.Provider
        value={{
          isLogged,
          setIsLogged,
          user,
          setUser,
          loading
        }
        }>
        {children}
      </GlobalContext.Provider>
    </>
  );
};

export default GlobalProvider;