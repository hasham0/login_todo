import React, { Dispatch, createContext } from "react";

export type UserTS = {
  _id?: string;
  username?: string;
  email: string;
  password: string;
};

export type UserContextTS = {
  user: UserTS;
  setUser: Dispatch<React.SetStateAction<UserTS>>;
};
const UserContext = createContext<UserContextTS>({} as UserContextTS);
export default UserContext;
