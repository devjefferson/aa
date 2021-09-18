import React, { createContext } from "react";
import {  DataCoord } from "IntefaceDefalut";
import useAuth, { DataUserSignedProps } from "../hooks/useAuth";
import useManegerAsyncStorage from '../hooks/useManegerAsyncStorage'
import usePermissions, { DataInitial } from '../hooks/usePermissions'
import useOcorrence, { DataListOccurrence, DataSetView } from "../hooks/useOcorrence";

export interface DataToken {
  token: string
}
interface DataProviderContext {
  // Auth
  signed: boolean;
  userData: DataUserSignedProps | undefined
  SignIn(email: string, password: string): Promise<void | any>
  signUp(data: object): Promise<any>
  SignOut(): void
  getToken: DataToken | any
  recuverPassword(email: string): Promise<void>

  // Permission
  RequestPermissionLocation(): void
  getLocationAsync(): Promise<DataCoord>
 

  // Cache e asyncStorage 
  setUsernameStarted(UserName: string): Promise<void>
  getUsernameStarted(): Promise<void | string | null>
 

  // Occorrence
  getOcorrencePinMap(day: number): Promise<DataListOccurrence>
  getListOccurrence(count: string, params?: string): Promise<DataListOccurrence>
  getListUpdate(lastItem: any) : Promise<DataListOccurrence>
  getListUserUpdate(lastItem: any, uuid: string) : Promise<DataListOccurrence>
  getOcorrenceUser(uuid: string): Promise<DataListOccurrence>
  getListSearch(params: string | undefined) : Promise<DataListOccurrence>, 
  getListSearchUpdate(lastItem: any, params: string): Promise<DataListOccurrence>,
  setOcorrence({ }): Promise<void>
  deleteOcorrenceUser(id: string): void
  updateView(id: string): Promise<void>
  updateShared(id: string): Promise<void>
  userLocal: boolean
  getRegionInitial: DataInitial

}

const AppContext = createContext<DataProviderContext>(
  {} as DataProviderContext
);

export function AppProvider({ children }: any) {
  const {
    userData,
    SignIn,
    SignOut,
    signUp,
    recuverPassword,
    getToken,
  } = useAuth()

  const {
    RequestPermissionLocation,
    getRegionInitial,
    getLocationAsync
  } = usePermissions()
  const {
    getUsernameStarted,
    setUsernameStarted,
    userLocal
  } = useManegerAsyncStorage()

  const {
    setOcorrence,
    getOcorrencePinMap,
    getOcorrenceUser,
    deleteOcorrenceUser,
    getListUserUpdate,
    getListOccurrence,
    getListUpdate,
    getListSearch, 
    getListSearchUpdate,
    updateView,
    updateShared
  } = useOcorrence()



  return (
    <AppContext.Provider
      value={{
        //Auth
        signed: !!userData,
        userData,
        SignIn,
        signUp,
        SignOut,
        recuverPassword,
        setUsernameStarted,
        getToken,

        //Permission
        RequestPermissionLocation,
        getRegionInitial,
        getLocationAsync,

        //Local
        getUsernameStarted,
        userLocal,


        //Occorrence
        getOcorrencePinMap,
        getListOccurrence,
        getListUpdate,
        getOcorrenceUser, 
        getListUserUpdate,
        setOcorrence,
        deleteOcorrenceUser,
        getListSearch, 
        getListSearchUpdate,
        updateView,
        updateShared
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
