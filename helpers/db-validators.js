
const Role = require('../models/role.js');
const Usuario = require('../models/usuario');


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

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}