exports.createInternship = async (req, res) => {
  try {
    const { title, company, location, description, stipend } = req.body;

    const internship = new Internship({
      title,
      company,
      location,
      description,
      stipend
    });

    await internship.save();

    res.status(201).json({
      message: "Internship created successfully",
      internship
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
