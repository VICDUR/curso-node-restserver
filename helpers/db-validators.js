
const Role = require('../models/role.js');
const { Usuario, Categoria, Producto } = require('../models');


const esRolValido = async (rol = '') => {     
    const existeRol = await Role.findOne({ rol });
    if (! existeRol ) {
            throw new Error(` El rol ${ rol } no esta registrado en la BD`)
    }
};

const emailExiste = async (correo) => {
    const existeCorreo = await Usuario.findOne({ correo });
    if ( existeCorreo ) {
         throw new Error(` El correo ${ correo } ya esta registrado en la BD`)
    }
};

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
         throw new Error(` El id ${ id } no existe en la BD`)
    }
};

const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    console.log('se esta ejecutando existeCategoria')

    if ( !existeCategoria ) {
        console.log('No existe')
         throw new Error(`El id ${ id } no existe en la BD`)
    }

    console.log('si Existe categoria')
};

const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
         throw new Error(`El id ${ id } no existe en la BD`)
    }
};


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}