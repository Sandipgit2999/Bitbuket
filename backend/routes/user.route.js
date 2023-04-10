require("dotenv").config();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { Router } = require("express");

const { UserModel } = require("../models/user.model");

const UserController = Router();

UserController.post("/", async (req, res) => {
  const { email, name } = req.body;

  const password = "ajkdfjk45625";
  const present = await UserModel.findOne({ email });

  if (present) {
    res.send({ msg: "User already created please login" });
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.send({ msg: "Something went wrong please try again" });
      } else {
        const new_user = new UserModel({ email, password: hash, name });

        await new_user.save();
        console.log("-=-=", new_user);

        res.send({ msg: "User created successfully", userId: new_user._id });
      }
    });
  }
});

UserController.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("---",req.params);

  if (req.params) {
    const user = await UserModel.findOne({ _id: id });
    res.send(user);
  } else {
    const users = await UserModel.find();
    res.send(users);
  }
});

UserController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  console.log(id, payload);
  const new_user = await UserModel.updateOne(
    {
      _id: id,
    },
    {
      $set: payload,
    }
  );

  res.send({ msg: "user updated successfully" });
});

UserController.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const new_user = await UserModel.deleteOne({ _id: id });

  res.send({ msg: "user successfully deleted" });
});

module.exports = {
  UserController,
};
