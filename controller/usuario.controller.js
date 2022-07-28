const {request, response} = require('express');


const usuariosGet = (req = request, res) => {

    const { q, nombre = 'no name', apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get API',
        q,
        nombre,
        page,
        limit
    
    })
};

const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body

    res.status(201).json({
        msg: 'post API',
        nombre,
        edad,
    })
}

const usuariosPut = (req, res) => {

    const { id } = req.params

    res.status(400).json({
        msg: 'put API',
        id
    })
}


const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API',
    })
}


const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API',
    })
}









module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}