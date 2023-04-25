const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/usersModel");
const LessonModel = require("../models/lessonsModel");
const mongoose = require('mongoose');
const { use } = require('../routes/UserRoute');

dotenv.config();

const JWT_TOKEN = process.env.JWT_TOKEN;

module.exports.registerUser = async(req, res, next) => {
    const {username, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new UserModel({username, password: hashed});

    try {
        const oldUser = await UserModel.findOne({username: username});
        if(oldUser) {
            return res.status(400).json("Username already in use");
        }
        const savedUser = await newUser.save();

        const token = jwt.sign({
            username: savedUser.username,
            id: savedUser._id
        }, JWT_TOKEN);

        return res.status(200).json({
            message: "User created successfully",
            user: savedUser,
            token: token,
        });

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.loginUser = async(req, res, next) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({username: username});
        if(user) {
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid) {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id,
                    isAdmin: user.isAdmin
                }, JWT_TOKEN);
                
                return res 
                        .cookie("ditmetoken", token, {
                            httpOnly: true,
                        })
                        .status(200)
                        .json({
                            message: "Lgin successfully",
                            user: user,
                            token: token,
                        });
            }
            else {
                return res.status(400).json({message: "Wrong password"});
            }
        }
        else {
            return res.status(400).json({message: "User not found"});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.getUser = async(req, res, next) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports.getUsers = async(req, res, next) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error.message);
    }
    

}

module.exports.finishLesson = async (req, res, next) => {
    const userId = req.params.id;
    const lessonId = new mongoose.Types.ObjectId(req.body.lessonId);

    try {
        const user = await UserModel.findById(userId);
        const lesson = await LessonModel.findById(lessonId);

        if(user && lesson) {
            if(!user.learnedLesson.some(obj => obj._id.equals(lessonId))){
                await user.updateOne({$push: {learnedLesson: {
                    _id: lessonId,
                    lessonName: lesson.name
                }}});
                return res.status(200).json({
                    message: "Finish lesson",
                    user: user,
                })
            }
            else {
                return res.status(403).json("User is already finished lesson");
            }

        }
        else {
            return res.status(400).json({
                message: "Invalid user or lesson",
            })
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}