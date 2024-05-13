import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const testController = (req, res) => {
  res.send("test");
};

export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );

      if (!token) {
        return res.status(400).send("Invalid Token");
      }

      // Store the token in the user document
      user.token = token;
      user.tokenExpiration = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours expiration
      await user.save();

      return res
        .cookie("jwtToken", token, {
          maxAge: 3 * 60 * 60 * 1000, // 3 hours expiration
          httpOnly: true,
        })
        .json({ success: true, msg: "Registration success", token, user });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Registration failed with some error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findByEmail = async (email) => {
      try {
        const user = await User.findOne({ email });
        return user;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const user = await findByEmail(email);
    if (!user) {
      return res.status(400).send("Incorrect Credentials");
    } else {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        if (!token) {
          return res.status(400).send("Invalid Token");
        }

        // Store the token in the user document
        user.token = token;
        user.tokenExpiration = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration
        await user.save();

        return res
          .cookie("jwtToken", token, {
            maxAge: 1 * 60 * 60 * 1000, // 1 hour expiration
            httpOnly: true,
          })
          .json({ success: true, msg: "user login successful", user, token });
      } else {
        return res.status(400).send("Password is not valid");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong with the database");
  }
};
