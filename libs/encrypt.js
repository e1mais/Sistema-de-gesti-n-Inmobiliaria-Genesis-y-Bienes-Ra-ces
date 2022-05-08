
const bcrypt = require('bcryptjs');

 exports.encriptar = async (password) => {
      const salt = await bcrypt.genSalt(8);
      const hash = await bcrypt.hash(password,salt);
      return hash;
    }

  exports.comparar = async (password, saved) => {
        try {
          return await bcrypt.compare(password,saved)
        } catch (error) {
          console.error(error)
        }
    }
