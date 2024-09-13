import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import fs from 'fs';
import path from "path";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


export const createTeacher = (upload.single('file'), async (req, res, next) => {
    const { username, email, password, firstname,
      lastname, phone, address, bloodtype, birthday,
      sex, subject, classes,image
     } = req.body

    

     const encryptedPassword = await bcrypt.hash(password, 10);
     
    try {
         if (!firstname || !lastname || !phone || !address || !birthday || !sex || !username || !password) {
          handleValidationError("Please Fill Full Form!", 400);
    }
    await Teacher.create({username, email, password:encryptedPassword, firstname,
      lastname, phone, address, bloodtype, birthday,
      sex, subject, classes, image});
    res.status(200).json({
      success: true,
      message: "Teacher Created!",
    }); 
    } catch (err) {
      next(err)
    }
  });
  

  export const getAllTeachers = async (req, res, next) => {
    try {
     const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers,
    });   
    } catch (err) {
      next(err)
    }
  };
  
 
