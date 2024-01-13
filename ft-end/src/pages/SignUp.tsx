import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Props = {};

type SignUpTS = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function SignUp({}: Props) {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState<SignUpTS>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (signUpInfo.password !== signUpInfo.confirmPassword) {
        return toast.error("password not match");
      } else {
        delete signUpInfo.confirmPassword;
      }
      const response = await fetch("http://localhost:7000/Signup", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const data = await response.json();
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex h-[70vh] flex-col items-center justify-center gap-6 border-2 border-black">
      <p className="text-3xl">Sign Up Form</p>
      <form
        onSubmit={handleSignUpSubmit}
        className="flex flex-col items-center justify-center gap-10 border-2 border-black bg-gray-300 p-5"
      >
        <label htmlFor="username">
          <input
            type="text"
            className="rounded-md border-2 border-black p-2"
            placeholder="Enter Your Username"
            value={signUpInfo.username}
            minLength={3}
            maxLength={50}
            required={true}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSignUpInfo({ ...signUpInfo, username: event.target?.value });
            }}
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            className="rounded-md border-2 border-black p-2"
            placeholder="Enter Your Email Address"
            value={signUpInfo.email}
            required={true}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSignUpInfo({ ...signUpInfo, email: event.target?.value });
            }}
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            className="rounded-md border-2 border-black p-2"
            placeholder="Enter Your Password"
            value={signUpInfo.password}
            minLength={8}
            maxLength={50}
            required={true}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSignUpInfo({ ...signUpInfo, password: event.target?.value });
            }}
          />
        </label>
        <label htmlFor="confirmPassword">
          <input
            type="text"
            className="rounded-md border-2 border-black p-2"
            placeholder="Confirm Password"
            value={signUpInfo.confirmPassword}
            required={true}
            minLength={8}
            maxLength={50}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSignUpInfo({
                ...signUpInfo,
                confirmPassword: event.target?.value,
              });
            }}
          />
        </label>
        <button className="btnStyle" type="submit">
          Sign up
        </button>
      </form>
    </section>
  );
}
