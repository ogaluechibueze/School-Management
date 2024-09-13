
import {Admin } from "../models/adminRegisterSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import { Teacher } from "../models/usersSchema.js";
import bcrypt from "bcryptjs";

export const adminRegister= async (req, res, next) => {
  console.log(req.body);
  const { email, password  } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
      if (!email || !password  ) {
        handleValidationError("Please Fill Form!", 400);
  }

    // Check if the admin already exists in the database
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

  await Admin.create({ email, password: encryptedPassword});
  res.status(200).json({
    success: true,
    message: "Admin Created!",
  });
  } catch (err) {
    next(err);
  }
};

export const teacherRegister= async (req, res, next) => {
  console.log(req.body);
  const { username, password  } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
      if (!username || !password  ) {
        handleValidationError("Please Fill Form!", 400);
  }

    // Check if the admin already exists in the database
    const existingTeacher = await Teacher.findOne({ username });
    if (existingTeacher) {
      return res.status(400).json({ success: false, message: "Teacher already exists" });
    }

  await Teacher.create({ email, password: encryptedPassword});
  res.status(200).json({
    success: true,
    message: "Admin Created!",
  });
  } catch (err) {
    next(err);
  }
};


