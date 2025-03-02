import User from "../models/user.js";

const loginOrSignup = async (req, res) => {
  const { name, phone, password, address } = req.body;
  try {
    let user = await User.findOne({
      phone,
    });
    if (!user) {
      user = new User({
        name,
        phone,
        password,
        address,
      });
      await user.save();
    } else {
      if (address) {
        user.address = address;
        await user.save();
      }
      if (password !== user.password) {
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      }
    }

    const { accessToken, refreshToken } = await generateTokens(user.toObject());
    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { user: user?._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );

  const refreshToken = jwt.sign(
    { user: user?._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

export { loginOrSignup };
