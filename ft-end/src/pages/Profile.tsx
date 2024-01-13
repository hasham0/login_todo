import { useContext, useEffect, useState } from "react";
import UserContext, { UserTS } from "../context/userContext";

type Props = {};

export default function Profile({}: Props) {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState<UserTS>({} as UserTS);

  useEffect(() => {
    if (user) {
      setCurrentUser({
        email: user.email,
        username: user.username,
        password: user.password,
      });
    }
  }, []);
  return (
    <div className="h-56 bg-black">
      <h1 className="text-center text-4xl uppercase text-white">
        welcome to the app
        <br />
        {currentUser.username}
      </h1>
    </div>
  );
}
