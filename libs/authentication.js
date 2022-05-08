const jwt = require('jsonwebtoken'),
  {encriptar, comparar} = require('./encrypt')
  pool = require('../database/db_pool')

  exports.register = async (req, res)=>{
    let {names, lastnames, email, password, confpassword } = req.body

    if(!names || !lastnames || !email || !password || !confpassword){
      console.log('Debe llenar los campos ')//ALERT
    }
    else{
      //Encriptando la contraseña
      password = await encriptar(password)

      //Estableciendo valores a un objeto
      const user = {
        names,
        lastnames,
        email,
        password
      }

      await pool.query('CALL SP_INSERTAR_USUARIO(?,?,?,?)',
      [user.names, user.lastnames, user.email, user.password],
      (error, result)=>{
        if(error) return console.log(error)

        res.render('layouts/register', {
          alert1: true,
          position: 'top-end',
          alertMessage: "Registrado con éxito",
          timer: 1500,
          ruta: 'login'
        })
      })
    }

  }

  exports.login = async (req, res)=>{
    try{
      const {username,password} = req.body
      
      if(!username || !password){
        res.render('layouts/login', { 
          alert: true,
          alertTitle: "Usuario y/o Contraseña estan vacíos",
          alertMessage: "Debe proporcionar los valores necesarios para el inicio de sesión",
          alertIcon: 'warning',
          showConfirmButton: true,
          timer: false,
        })
      }else{
        
      console.log(username, password)
      
      const result = await pool.query('SELECT C.Patron FROM usuario as U inner join credencial as C on C.id_usuario = U.id_usuario WHERE Correo_Recuperacion = ? and C.Fecha_Baja is NULL', username)

        //Si encuentra algo en la base de datos 
        if(result.length > 0){

          const user = result[0]

          const validPass = (password ,user.Patron)

          if(validPass){
            console.log('Contraseña valida')
            res.redirect('/menu')
          }else{
            console.log('se metio aqui')
            res.render('layouts/login', { 
              alert: true,
              alertTitle: "Error al Iniciar Sessión",
              alertMessage: "El correo o la contraseña son invalidos",
              alertIcon: 'info',
              showConfirmButton: true,
              timer: 1500,
              ruta: 'login'
            })
          }
        }else{
          console.log('no hay usuario')
          res.render('layouts/login', { 
            alert: true,
            alertTitle: "Error",
            alertMessage: "El correo o la contraseña son invalidos",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: 1500,
            ruta: 'login'
          })
        }
      }
    }catch(e){
      console.log('This is catch')
      console.log(e)
    }
  }