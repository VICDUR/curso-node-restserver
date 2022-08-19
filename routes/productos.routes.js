const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../midlewares');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const { crearProducto,
      obtenerProductos,
      obtenerProducto, 
      actualizarProducto,
      borrarProducto
    } = require('../controller/productos.controller.js');



const router = Router();

// obtener todas las  producto - publico
router.get('/', obtenerProductos);

// Obtener  producto por ID - publoco
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);



// Crear producto - privado - Cualquier persona con un toquen valido
router.post('/',[
    validarJWT,
    check("categoria", "No es un id de Mongo valido" ).isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
] , crearProducto);


// Actualizar producto - privado - Cualquier persona con un toquen valido
router.put('/:id', [
    validarJWT,
    // check("categoria", "No es un id de Mongo valido" ).isMongoId(), //no se utiliza
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto
);


// Borrar producto - ADMIN_ROLE
router.delete ('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],borrarProducto);



module.exports = router;
