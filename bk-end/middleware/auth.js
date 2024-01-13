import jwt from "jsonwebtoken";

export const isUserAuthenticate = async (request, response, next) => {
  try {
    const token = request.headers["authorization"].split(" ")[1];
    if (!token) {
      return response.json({
        message: "authentication token not found",
      });
    }

    // const token = request.headers.cookie.split("=")[1];
    // console.log("🚀  isUserAuthenticate  token:", token);

    // if (!(request.cookie && "Auth_Token" in request.cookie)) {
    //   return response.json({
    //     message: "authentication token not found",
    //   });
    // }
    //note: verifying jwt token
    const userToken = token;
    const decode = jwt.verify(userToken, process.env.JWT_SECRATE_KEY);
    request.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
