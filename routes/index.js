const express = require("express"),
  router = express.Router();

// Enrutamiento del Front End 
router.get("/", async(req, res) => {
   res.render('layouts/index');

});


module.exports = router;
