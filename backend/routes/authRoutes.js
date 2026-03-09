router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", {
      expiresIn: "1d"
    });

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});