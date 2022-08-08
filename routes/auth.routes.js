const { check } = require('express-validator');
const {Router} = require('express');

const { validarCampos } = require('../midlewares/validar-campos.js');

const { loginPost, googleSignIn } = require('../controller/auth.controller.js');


const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
],loginPost );


router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos,
], googleSignIn );



module.exports = router