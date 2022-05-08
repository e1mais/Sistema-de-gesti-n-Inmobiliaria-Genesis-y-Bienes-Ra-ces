const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
  
const { deserializeUser } = require("passport/lib");
const pool = require("../database/db_pool"),
  { encriptar, comparar } = require("./encrypt");

//SingIn

passport.use('local.signin', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true,
  }, async ( req, username, password, done )=>{
    const rows = await pool.query(
      'SELECT * FROM usuario WHERE Correo_Recuperacion = ?',
      [username]);
      if(rows.length > 0){
        const user = rows[0] //Tenemos el usuario, ahora busquemos su contraseña

       const credenciales = await pool.query('Select * FROM credencial Where id_usuario = ?', [user.id_usuario])
        
       if(credenciales > 0){
         credenciales = credenciales[0]
         
         const validPass = await comparar(password, user.password)
         
         console.log('Uso la estrategia 29')
          if(validPass){
           return done(null, user)
          }
          else{
           return done(null, false)
          }
        }else{

          console.log('Contraseña Incorrecta')
        }

      }else{
        return done(null, false)
      }
    }
))


//SignUp
passport.use("local.signup", new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query(
        "SELECT * FROM usuario WHERE Correo_Recuperacion = ?",
        [username]
      );

      if (rows.length > 0) {
        return done(null, false)
      } else {
        let { names, lastnames } = req.body;
        let newUser = {
          nmb: names,
          apd: lastnames,
          Correo_Recuperacion: username,
          pass: password,
        };

        newUser.pass = await encriptar(password);
        await pool.query(
          "CALL SP_INSERTAR_USUARIO(?,?,?,?)",
          [newUser.nmb, newUser.apd, newUser.Correo_Recuperacion, newUser.pass],
          (err, result, fields) => {
            if (err) return console.error(`This is error: ${err.message}`);

            console.log( {result} , {fields})
            return done(null, newUser);
          }
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.Correo_Recuperacion);
});

passport.deserializeUser(async (correo, done) =>{
  const rows = await pool.query(
    "SELECT * FROM usuario WHERE Correo_Recuperacion = ?",[correo], (err, result)=>{
      if(err)
        done(err)
      });
      done(null, rows[0]);  
});
