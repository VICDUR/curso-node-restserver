const {request, response} = require('express');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const Usuario  = require('../models/usuario');
// const { emailExiste } = require('../helpers/db-validators');



const usuariosGet = async (req = request, res) => {
    // argumentos opcionales que biene por query
    const { limite = 5, desde = 5 } = req.query;

    const query = {estado: true}

    /* const usuarios = await Usuario.find( query )
        .skip(Number(desde))
        .limit(Number(limite)) 
    const total = await Usuario.countDocuments( query ); */
    

    const [ total, usuarios ] = await  Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number(desde))
            .limit(Number(limite)), 
    ]);

    res.json({
        total,
        usuarios,
    })
};

const usuariosPost = async (req, res) => {


    const { nombre, correo, password, rol} = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save()

    res.status(201).json({
        usuario
    })
};



const usuariosPut = async (req, res) => {

    const { id } = req.params
    const {_id, password, google, correo, ...resto } = req.body

    //  TODO validar contra base de datos
    if(password){
        // Encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
       
    const updateUsuario = await Usuario.findByIdAndUpdate( id, resto)   

    res.status(200).json( updateUsuario);
};


const usuariosDelete = async  (req, res) => {

    const { id } = req.params;

    // Fisicamente borrar
    // const deleteUsuario = await Usuario.findByIdAndDelete(id);

    // Sigue existiendo pero su estado cambia a false o inabilitado, lo que le permite continuar con la integridad de la informacion
    const usuarioInabilitado = await Usuario.findByIdAndUpdate( id, { estado: false })

    res.json(usuarioInabilitado)
};



const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API',
    })
};



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}