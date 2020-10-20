const bcrypt = require('bcryptjs');
const password = {};

// Recibimos el password en texto plano
password.encryptPassword = async (password) => {
  // Generamos un patrón para generar el cifrado
  const salt = await bcrypt.genSalt(10);
  // Ciframos la contraseña en base al cifrado generado anteriormente
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

password.matchPassword = async (password, savedPassword) => {
  try {
    console.log(await bcrypt.compare(password, savedPassword))
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.error(e);
  }
}

module.exports = password;