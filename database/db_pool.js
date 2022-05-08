const mysql = require('mysql'),
  { promisify } = require('util');

  const pool =  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  pool.getConnection( (err,con) => {
    if (err) {
      if (err.code === "PROTOCOL_CONECTION_LOST")
        console.error("Se ha perdido la conexión con la base de datos");
      if (err.code === "ER_COUNT_CON_ERROR")
        console.error("El contadorde bases de datos ha excedido su limite");
      if (err.code === "ENNCONREFUSED")
        console.error("La conexion se ha acabado");
    }
    if(con) con.release()
      console.log( 'DB is connected' )
      return;
  } )

  pool.query = promisify(pool.query)

  module.exports = pool