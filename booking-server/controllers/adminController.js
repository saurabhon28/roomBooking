// import jwt from "jsonwebtoken";
// import { adminModel } from "../models/adminModel.js";

// export const getAdmin = async (req, res) => {
//   const data = await adminModel.find({});
//   if (data) {
//     return res.send({ code: 200, message: "Success", data: data });
//   } else {
//     return res.send({ code: 500, message: "Service Error" });
//   }
// };

// export const addAdmin = async (req, res) => {
//   const { username, password, type, status, date } = req.body;
//   const result = await adminModel.create({
//     username,
//     password,
//     type,
//     status,
//     date,
//   });
//   if (result) {
//     return res.send({ code: 200, message: "Success" });
//   } else {
//     return res.send({ code: 500, message: "Service Error" });
//   }
// };

// export const loginAdmin = async (req, res) => {
//   const { username, password } = req.body;
//   const userExists = await adminModel.findOne({ username: username });
//   if (userExists) {
//     if (userExists.password !== password) {
//       return res.send({
//         code: 400,
//         message: "Incorrect username or password",
//       });
//     }

//     const _token = jwt.sign({ ...userExists }, "PRIV_123");

//     return res.send({
//       code: 200,
//       message: "Login Success",
//       token: _token,
//       type: userExists.type,
//     });
//   } else {
//     return res.send({ code: 500, message: "Service Error" });
//   }
// };
