import { ChangeEvent, FormEvent, useContext, useState } from "react";
import UserContext, { UserContextTS, UserTS } from "../context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<UserTS>({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!loginInfo) return;
      const response = await fetch("http://localhost:7000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(loginInfo),
      });
      const { data, message, Token } = await response.json();
      setUser({
        _id: data._id,
        email: data.email,
        username: data.username,
        password: data.password,
      });
      Cookies.set("Auth_Token", Token);
      toast.success(message);
      if (Token) {
        navigate("/profile");
      }
      // reset state
      setLoginInfo({
        email: "",
        password: "",
      });
    } catch (error) {}
  };

  return (
    <section className="flex h-96 flex-col items-center justify-center gap-6 border-2 border-black">
      <p className="text-3xl">Login Form</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-10 border-2 border-black bg-gray-300 p-5"
      >
        <label htmlFor="email">
          <input
            type="text"
            className="rounded-md border-2 border-black p-2"
            placeholder="Enter Your Email Address"
            value={loginInfo.email}
            required={true}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setLoginInfo({ ...loginInfo, email: event.target?.value });
            }}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password" // Change type to "password"
            className="rounded-md border-2 border-black p-2"
            required={true}
            placeholder="Enter Your password"
            value={loginInfo.password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setLoginInfo({ ...loginInfo, password: event.target?.value });
            }}
          />
        </label>
        <button className="btnStyle" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
