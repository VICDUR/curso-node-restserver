const  validarCampos  = require('../midlewares/validar-campos.js');
const  validarJWT  = require('../midlewares/validar-jwt.js');
const  validaRoles = require('../midlewares/validar-roles.js');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}
