import { handleValidationError } from "../middlewares/errorHandler.js";
import {Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/studentSchema.js";
import { Teacher } from "../models/teacherSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const JWT_SECRET = "ggwttquua42334bna?12"

export const adminSignIn = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    if (!username || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    const existingAdmin = await Admin.findOne({ username });

    if (!existingAdmin) {
      return res.json({ error: "Invalid email or password" });
    }
if (await bcrypt.compare(password, existingAdmin.password)){
  const token = jwt.sign({username, id: existingAdmin.id}, JWT_SECRET,
    {},(err,token) => {
      if(err) throw err;
      res.cookie('token', token).json({
       id:existingAdmin.id,
       username,   
      });
    });
  if(res.status(201)){
    return res.json({status: "ok", data:token});
  }
  else{
    return res.json({error: "error"});
  }
}
res.json({status: "error", error: "invalid Password"});
  }
  catch (err) {
    next(err);
  }
};




export const studentSignIn = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    if (!username || !password) {
      handleValidationError("Please provide username and password", 400);
    }
    const existingStudent = await Student.findOne({ username });

    if (!existingStudent) {
      return res.json({ error: "Invalid username or password" });
    }
if (await bcrypt.compare(password, existingStudent.password)){
  const token = jwt.sign({}, JWT_SECRET);
  if(res.status(201)){
    return res.json({status: "ok", data:token});
  }
  else{
    return res.json({error: "error"});
  }
}
res.json({status: "error", error: "invalid username or Password"});
  }
  catch (err) {
    next(err);
  }
};

export const teacherSignIn = async (req, res, next) => { 
  const { username, password } = req.body;
  
  try {
    if (!username || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    const existingTeacher = await Teacher.findOne({ username });

    if (!existingAdmin) {
      return res.json({ error: "Invalid email or password" });
    }
if (await bcrypt.compare(password, existingTeacher.password)){
  const token = jwt.sign({}, JWT_SECRET);
  if(res.status(201)){
    return res.json({status: "ok", data:token});
  }
  else{
    return res.json({error: "error"});
  }
}
res.json({status: "error", error: "invalid Password"});
  }
  catch (err) {
    next(err);
  }
};

//export const getUser = async (req, res) => {
  //const {token} = req.cookies; 
  //jwt.verify(token,JWT_SECRET, {}, (err,info) => {
 //if(err) throw err;
 //res.json(info);
 // });
 //};

 //export const LogoutUser = async (req, res) => {
  //res.cookie('token', '').json('ok');
 //}

