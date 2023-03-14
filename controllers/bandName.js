const BandName = require("../models/BandName");

module.exports = {
  createBandName: async (req, res) => {
    try {
      await BandName.create({
        BandName: req.body.BandName,
      });
      console.log("Band Name has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
