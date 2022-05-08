const router = require('express').Router(),
  auth = require('../libs/authentication')

  router.get("/login", (req, res) => {
    res.render(`layouts/login`);
  });
    
  router.get('/register', (req, res) => {
    res.render(`layouts/register`);
  })
  
  router.get('/menu', (req, res)=>{
    res.send('asdf')
  })

  router.post('/register', auth.register)
  

  router.post('/login', auth.login)
  
  

  

  module.exports = router;
