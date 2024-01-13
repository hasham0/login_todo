import { ReactNode, useContext, useState } from "react";
import UserContext, { UserTS } from "./userContext";

type Props = {
  children: ReactNode;
};

export default function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserTS>({
    _id: "",
    email: "",
    password: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
