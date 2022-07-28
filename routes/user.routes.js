
const { Router } = require('express');

const {  
        usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controller/usuario.controller.js');

const router = Router();


router.get('/', usuariosGet);


router.post('/', usuariosPost );


router.put('/:id', usuariosPut);


router.patch('/',usuariosPatch );


router.delete('/', usuariosDelete);







module.exports = router