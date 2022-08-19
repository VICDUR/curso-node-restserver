const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../midlewares');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const { crearCategoria,
      obtenerCategorias,
      obtenerCategoria, 
      actualizarCategoria,
      borrarCategoria
    } = require('../controller/categorias.controller.js');



const router = Router();

// obtener todas las  categorias - publico
router.get('/', obtenerCategorias);

// Obtener  categorias por ID - publoco
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);



// Crear categorias - privado - Cualquier persona con un toquen valido
router.post('/',[
    validarJWT,
    check("nombre", "EL nombre es Obligatorio" ).not().isEmpty(),
    validarCampos
] , crearCategoria);


// Actualizar categorias - privado - Cualquier persona con un toquen valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check("categoria", "No es un id de Mongo valido" ).isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria
);


// Borrar categorias - ADMIN_ROLE
router.delete ('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],borrarCategoria);



module.exports = router;
