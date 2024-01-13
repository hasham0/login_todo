// packages
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import bscrytjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { SignUp_User } from "./models/Signup.,model.js";
import { database_Connect } from "./config/db.js";
import { Todo } from "./models/Todo.model.js";
import { isUserAuthenticate } from "./middleware/auth.js";

// set variable
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  Credential: true,
};

// database connection
(() => database_Connect())();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// signup User
app.post("/Signup", async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const isUserExisted = await SignUp_User.findOne({ email });
    if (isUserExisted) {
      return response.json({
        message: "user already existed",
        data: isUserExisted,
      });
    }

    const encryptPassword = await bscrytjs.hash(password, 10);
    const createNewUser = await SignUp_User.create({
      username: username,
      email: email,
      password: encryptPassword,
    });
    response.json({
      message: "User Created Successfully",
      data: createNewUser,
    });
  } catch (error) {
    console.log("🚀  app.post  error:", error);
  }
});

// Login User
app.post("/Login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const isUserExisted = await SignUp_User.findOne({ email });
    if (!isUserExisted) {
      return response.json({
        message: "user not found please SignUp",
      });
    }
    const isPasswordValid = await bscrytjs.compare(
      password,
      isUserExisted.password
    );

    if (!isPasswordValid) {
      return response.json({
        message: "password is not match please try again",
      });
    }

    const Token = await jwt.sign(
      {
        _id: isUserExisted._id,
        email: isUserExisted.email,
      },
      process.env.JWT_SECRATE_KEY
    );

    response.cookie("Auth_Token", Token, {
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
      secure: true,
    });

    return response.json({
      message: "User Login Successfully",
      data: isUserExisted,
      Token: Token,
    });
  } catch (error) {
    console.log(error);
  }
});

// Logout User
app.get("/Logout", isUserAuthenticate, async (request, response) => {
  try {
    return response
      .clearCookie("Auth_Token", { httpOnly: true, secure: true })
      .json({
        message: "Logout Successfully",
      });
  } catch (error) {
    console.log(error);
  }
});

// get all todos api
app.get("/allTodos", isUserAuthenticate, async (request, response) => {
  const { _id: user_id } = request.user;
  const allTodo = await Todo.find({ user_id });
  response.json({
    message: "all todos",
    data: allTodo,
  });
});

// creating new todo
app.post("/newTodo", isUserAuthenticate, async (request, response) => {
  const { task, status } = request.body;
  const { _id: user_id } = request.user;
  const newTodo = await Todo.create({
    task: task,
    status: status,
    user_id: user_id,
  });
  response.json({
    message: "todo added successfully",
    data: newTodo,
  });
});

// updating todo api
app.put("/updateTodo/:_id", isUserAuthenticate, async (request, response) => {
  const { _id } = request.params;
  const todoData = request.body;
  const updateTodo = await Todo.findByIdAndUpdate(_id, todoData, {
    new: true,
  });
  response.json({
    message: "todo update successfully",
    data: updateTodo,
  });
});

// deleting todo api
app.delete(
  "/deleteTodo/:_id",
  isUserAuthenticate,
  async (request, response) => {
    const { _id } = request.params;
    const deleteTodo = await Todo.findByIdAndDelete(_id);
    response.json({
      message: "todo delete successfully",
    });
  }
);

// clear api
app.delete("/clear", isUserAuthenticate, async (request, response) => {
  const deleteAllTodos = await Todo.deleteMany();
  response.json({
    message: "all clear",
    data: [],
  });
});

// server listen
app.listen(process.env.PORT);
